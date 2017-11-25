import { Inject, Injectable, PLATFORM_ID, Injector, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { isUndefined } from 'lodash-es';

import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {
	private config: any;
	private isPlatformBrowser = isPlatformBrowser;
	private route: ActivatedRoute;

	constructor(
		private httpClient: HttpClient,
		private storage: LocalStorageService,
		@Inject(DOCUMENT) private document: any,
		@Inject(PLATFORM_ID) private platformId: Object) {

	}

	public ensureLoggedIn(): Promise<any> {
		return this.getConfig()
			.then(this.getAuthCode)
			.then(this.getAccessToken)
			.catch(this.redirectToLogin);
	}

	private storeAccessToken(token: any) {
		if (token) {
			this.storage.set('accessToken', token);
		}
	}

	private retrieveAccessToken(): any {
		return this.storage.get('accessToken');
	}

	private getConfig = (): Promise<any> => {
		return new Promise<any>((resolve, reject) => {
			this.httpClient.get('/api/deputy/config').subscribe(config => {
				this.config = config;
				resolve(config);
			}, error => {
				reject(error);
			});
		});
	}

	private getAuthCode = (): Promise<any> => {
		return new Promise<any>((resolve, reject) => {
			//if (this.isPlatformBrowser(this.platformId) && this.retrieveAccessToken() == null) {
				if (this.document != null && this.document.location != null) {
					const queryString: { [key: string]: string } = this.document.location.search.replace(/^\?/, '').split('&').reduce((prev: { [key: string]: string }, curr: string) => {
						const [key, value] = curr.split('=');
						return Object.assign(prev, { [key]: decodeURIComponent(value) });
					}, {});

					if (!isUndefined(queryString['code'])) {
						resolve(queryString['code']);
					}
					reject();
				}
			//}
		});
	}

	private getAccessToken = (authCode: string | null): Promise<any> => {
		return new Promise<any>((resolve, reject) => {
			this.httpClient.get(`/api/deputy/accesstoken/${authCode}`).subscribe(accessToken => {
				this.storeAccessToken(accessToken);
				resolve(accessToken);
			}, error => {
				reject(error);
			});
		});
	}

	private redirectToLogin = () => {
		if (this.isPlatformBrowser(this.platformId) && this.retrieveAccessToken() == null) {
			if (this.document != null && this.document.location != null) {
				this.document.location.href = `https://once.deputy.com/my/oauth/login?client_id=${this.config.clientId}&redirect_uri=${this.document.location.origin}/&response_type=code`
			}
		}
	}
}