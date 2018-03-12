import {
	HttpHandler,
	HttpHeaderResponse,
	HttpInterceptor,
	HttpProgressEvent,
	HttpRequest,
	HttpResponse,
	HttpSentEvent,
	HttpUserEvent
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private injector: Injector) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<
		| HttpSentEvent
		| HttpHeaderResponse
		| HttpProgressEvent
		| HttpResponse<any>
		| HttpUserEvent<any>
	> {
		if (!req.url.startsWith('/api/authorisation')) {
			const authService = this.injector.get(AuthService);
			const updated = req.clone({
				setHeaders: {
					Accept: 'application/json',
					access_token: JSON.stringify(authService.retrieveAccessToken())
				},
				withCredentials: true
			});
			return next.handle(updated);
		}
		return next.handle(req);
	}
}
