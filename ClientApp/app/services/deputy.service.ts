import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { LeaveResponse, RosterResponse } from '../models';

@Injectable()
export class DeputyService {
	constructor(private httpClient: HttpClient) {}

	config(): Observable<any> {
		return this.httpClient.get('/api/deputy/config');
	}

	accessToken(authCode: string): Observable<object> {
		return this.httpClient.get(`/api/deputy/accesstoken/${authCode}`);
	}

	rosters(
		startDate: string,
		endDate: string
	): Observable<Array<Array<RosterResponse>>> {
		return this.httpClient.post<Array<Array<RosterResponse>>>(
			'/api/deputy/rosters',
			{ startDate, endDate }
		);
	}

	leave(startDate: string, endDate: string): Observable<LeaveResponse[]> {
		return this.httpClient.post<LeaveResponse[]>('/api/deputy/leave', {
			startDate,
			endDate
		});
	}
}
