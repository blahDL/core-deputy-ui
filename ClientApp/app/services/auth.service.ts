import {
	Inject,
	Injectable,
	PLATFORM_ID,
	Injector,
	OnInit
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { isUndefined } from 'lodash-es';

import 'rxjs/add/operator/switchMap';
import { AccessTokenResponse } from '../models/AccessTokenResponse';
import { Config } from '../models/Config';

@Injectable()
export class AuthService {
	private config: any;
	private isPlatformBrowser = isPlatformBrowser;

	constructor(
		private httpClient: HttpClient,
		private storage: LocalStorageService,
		@Inject(DOCUMENT) private document: any,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

	public async ensureLoggedIn(): Promise<AccessTokenResponse> {
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

	public retrieveAccessToken(): any {
		return this.storage.get('accessToken');
	}

	private getConfig = (): Promise<Config> => {
		return new Promise<Config>((resolve, reject) => {
			this.httpClient.get<Config>('/api/authorisation/config').subscribe(
				config => {
					this.config = config;
					resolve(config);
				},
				error => {
					reject(error);
				}
			);
		});
	};

	private getAuthCode = (): Promise<string> => {
		return new Promise<string>((resolve, reject) => {
			//if (this.isPlatformBrowser(this.platformId) && this.retrieveAccessToken() == null) {
			if (this.document != null && this.document.location != null) {
				const queryString: {
					[key: string]: string;
				} = this.document.location.search
					.replace(/^\?/, '')
					.split('&')
					.reduce((prev: { [key: string]: string }, curr: string) => {
						const [key, value] = curr.split('=');
						return Object.assign(prev, { [key]: decodeURIComponent(value) });
					}, {});

				if (!isUndefined(queryString['code'])) {
					resolve(queryString['code']);
				} else {
					reject();
				}
			}
			//}
		});
	};

	private getAccessToken = (authCode: string | null): Promise<AccessTokenResponse> => {
		return new Promise<AccessTokenResponse>((resolve, reject) => {
			this.httpClient.get<AccessTokenResponse>(`/api/authorisation/accesstoken/${authCode}`).subscribe(
				accessToken => {
					this.storeAccessToken(accessToken);
					resolve(accessToken);
				},
				error => {
					reject(error);
				}
			);
		});
	};

	private redirectToLogin = async (): Promise<any> => {
		if (
			this.isPlatformBrowser(this.platformId) &&
			this.retrieveAccessToken() == null
		) {
			if (this.document != null && this.document.location != null) {
				this.document.location.href = `https://once.deputy.com/my/oauth/login?client_id=${
					this.config.clientId
					}&redirect_uri=${this.document.location.origin}/&response_type=code&scope=longlife_refresh_token`;
				await new Promise((resolve,reject) => { });
			}
		}
	};
}
