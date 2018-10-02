import { Component, ViewChild } from '@angular/core';
import { flatten } from 'lodash-es';
import * as AllMoment from 'moment';
import { Moment } from 'moment';
import { extendMoment } from 'moment-range';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { finalize } from 'rxjs/operators';
import { LeaveResponse, RosterResponse } from '../../models';
import { DeputyService } from '../../services/deputy.service';
import { ModalComponent } from '../modal/modal.component';

const moment = extendMoment(AllMoment);

@Component({
	selector: 'deputy-roster',
	styleUrls: ['./roster.component.scss'],
	templateUrl: './roster.component.html'
})
export class RosterComponent {
	@ViewChild(ModalComponent)
	loadingModal?: ModalComponent;
	startDate: string;
	startDates: Array<string>;
	endDate: string = '';
	rosters?: Array<Array<RosterResponse>>;
	leave?: Array<LeaveResponse>;
	dateRange?: Array<Moment>;

	private momentFormat: string = 'YYYY-MM-DD';

	constructor(private service: DeputyService) {
		const startYear = 2017;
		const startWeek = 5;
		const startDate = moment().subtract(1, 'year');
		const endDate = moment().add(18, 'months');
		let currentDate: Moment = moment(`${startYear}-6-${startWeek}`, 'gggg-e-w');
		this.startDates = [];
		while (currentDate.isBefore(startDate)) {
			currentDate = currentDate.add(4, 'weeks');
		}
		do {
			this.startDates.push(currentDate.format(this.momentFormat));
			currentDate = currentDate.add(4, 'weeks');
		} while (currentDate.isBefore(endDate));

		this.startDate = this.startDates[0];
		this.updateEndDate();
	}

	protected shiftRange(
		roster: Array<RosterResponse>
	) /*: LeaveResponse | RosterResponse | undefined*/ {
		if (!this.dateRange) return;
		return this.dateRange.map(
			(date: Moment) =>
				(this.leave &&
					this.leave.find(
						(leave: LeaveResponse) =>
							leave.employee === roster[0].employee &&
							date.isBetween(leave.dateStart, leave.dateEnd, 'day', '[]')
					)) ||
				roster.find((shift: RosterResponse) =>
					moment(shift.date).isSame(date, 'day')
				)
		);
	}

	readRosters(): void {
		if (this.loadingModal) this.loadingModal.show();
		this.rosters = [];
		this.leave = [];
		this.dateRange = Array.from(
			moment.range(moment(this.startDate), moment(this.endDate)).by('day')
		);

		forkJoin(
			this.service.rosters(this.startDate, this.endDate),
			this.service.leave(this.startDate, this.endDate)
		)
			.pipe(
				finalize(() => {
					if (this.loadingModal) this.loadingModal.hide();
				})
			)
			.subscribe(
				([rosters, leave]: [
					Array<Array<RosterResponse>>,
					Array<LeaveResponse>
				]): void => {
					this.rosters = rosters;
					this.leave = leave;
				},
				(error: Error) => console.error(error)
			);
	}

	protected totalForDate(
		date: Moment,
		shift: 'day' | 'night',
		roster: Array<RosterResponse>
	) {
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

		return moment((shift as RosterResponse).startTimeLocalized).hour() <= 12
			? 'Day'
			: 'Night';
	}

	protected shiftClass(shift?: RosterResponse | LeaveResponse): string {
		if (!shift) return '';

		if (shift.hasOwnProperty('status')) {
			const leave = shift as LeaveResponse;
			return leave.status === 0 ? 'warning' : 'danger';
		} else if (
			moment((shift as RosterResponse).startTimeLocalized).hour() <= 12
		) {
			return 'success';
		}
		return 'info';
	}

	updateEndDate(): void {
		this.endDate = moment(this.startDate, this.momentFormat)
			.add(4, 'weeks')
			.add(-1, 'days')
			.format(this.momentFormat);
	}

	protected totalHours(roster: Array<RosterResponse>): string {
		return roster
			.reduce(function(sum, current) {
				return sum + current.totalTime;
			}, 0)
			.toFixed(2);
	}
}
