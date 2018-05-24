import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LeaveResponse, RosterResponse } from '../models';

@Injectable()
export class DeputyService {
	constructor(private http: HttpClient) {}

	rosters(
		startDate: string,
		endDate: string
	): Observable<Array<Array<RosterResponse>>> {
		return this.http.post<Array<Array<RosterResponse>>>('/api/deputy/rosters', {
			startDate,
			endDate
		});
	}

	leave(startDate: string, endDate: string): Observable<LeaveResponse[]> {
		return this.http.post<LeaveResponse[]>('/api/deputy/leave', {
			startDate,
			endDate
		});
	}
}
