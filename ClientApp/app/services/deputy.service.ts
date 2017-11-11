import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LeaveRequest, LeaveResponse, RosterRequest, RosterResponse } from '../models';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DeputyService {

  constructor(private http: Http) { }

  rosters(startDate: string, endDate: string): Observable<Array<Array<RosterResponse>>> {
	  return this.http.post('/api/deputy/rosters', { startDate, endDate }).map((response: Response) => response.json());
  }

  leave(startDate: string, endDate: string): Observable<LeaveResponse[]> {
	  return this.http.post('/api/deputy/leave', { startDate, endDate }).map((response: Response) => response.json());
  }
}
