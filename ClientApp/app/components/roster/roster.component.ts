﻿import { Component, OnInit, ViewChild } from "@angular/core";
import { DeputyService } from "../../services/deputy.service";
import { LeaveResponse, RosterResponse } from "../../models";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import * as AllMoment from 'moment';
import { extendMoment } from 'moment-range';
import { Moment } from "moment";
import { flatten, flattenDeep } from 'lodash-es';
import { ModalComponent } from "../modal/modal.component";


const moment = extendMoment(AllMoment);

@Component({
	selector: 'deputy-roster',
	styleUrls: ['./roster.component.scss'],
	templateUrl: './roster.component.html'
})
export class RosterComponent {
	@ViewChild(ModalComponent)
	loadingModal: ModalComponent;
	startDate: string;
	startDates: Array<string> = [];
	endDate: string;
	endDates: Array<string>;
	rosters: Array<Array<RosterResponse>>;
	leave: Array<LeaveResponse>;
	dateRange: Array<Moment>;

	private momentFormat: string = 'YYYY-MM-DD';

	constructor(private service: DeputyService) {
		const startYear = 2017;
		const startWeek = 5;
		let currentDate: Moment = moment(`${startYear}-6-${startWeek}`, 'gggg-e-w');
		do {
			this.startDates.push(currentDate.format(this.momentFormat));
			currentDate = currentDate.add(4, 'weeks');
		} while (this.startDates.length < 20);
		this.endDates = [...this.startDates.map(i => moment(i).add(-1, 'days').format(this.momentFormat)), currentDate.add(-1, 'days').format(this.momentFormat)];

		this.startDate = this.startDates[0];
		this.updateEndDate();
	}

	protected shiftRange(roster: Array<RosterResponse>)/*: LeaveResponse | RosterResponse | undefined*/ {
		return this.dateRange.map((date: Moment) =>
			this.leave.find((leave: LeaveResponse) => leave.employee === roster[0].employee && date.isBetween(leave.dateStart, leave.dateEnd, 'day', '[]')) ||
			roster.find((shift: RosterResponse) => moment(shift.date).isSame(date, 'day'))
		);
	}

	readRosters(): void {
		this.loadingModal.show();
		this.rosters = [];
		this.leave = [];
		this.dateRange = Array.from(
			moment.range(moment(this.startDate), moment(this.endDate)).by('day')
		);

		Observable.forkJoin(
			this.service.rosters(this.startDate, this.endDate),
			this.service.leave(this.startDate, this.endDate)
		).subscribe(([rosters, leave]: [Array<Array<RosterResponse>>, Array<LeaveResponse>]): void => {
			this.rosters = rosters;
			this.leave = leave;
			}, error => console.error(error),
			() => this.loadingModal.hide());
	}

	protected totalForDate(date: Moment, shift: 'day' | 'night', roster: Array<RosterResponse>) {
		let list = flatten(roster).filter((item: RosterResponse) => {
			let hour = moment(item.startTimeLocalized).hour();
			return (
				moment(item.startTimeLocalized).isSame(date, 'day') &&
				((shift === 'day' && hour <= 12) || (shift === 'night' && hour > 12))
			);
		});

		return list.length;
	}

	protected shiftText(shift?: RosterResponse | LeaveResponse): string {
		if (!shift) return '';

		if (shift.hasOwnProperty('status')) {
			return 'LEAVE';
		}

		return moment((shift as RosterResponse).startTimeLocalized).hour() <= 12 ? 'Day' : 'Night';
	}


	protected shiftClass(shift?: RosterResponse | LeaveResponse): string {
		if (!shift) return '';

		if (shift.hasOwnProperty('status')) {
			const leave = shift as LeaveResponse;
			return leave.status === 0 ? 'warning' : 'danger';
		} else if (moment((shift as RosterResponse).startTimeLocalized).hour() <= 12) {
			return 'success';
		} 
		return 'info';
	}

	updateEndDate(): void {
		this.endDate = moment(this.startDate, this.momentFormat)
			.add(4, 'weeks').add(-1, 'days')
			.format(this.momentFormat);
	}

	protected totalHours(roster: Array<RosterResponse>): string {
		return roster
			.reduce(function (sum, current) {
				return sum + current.totalTime;
			}, 0)
			.toFixed(2);
	}
}
