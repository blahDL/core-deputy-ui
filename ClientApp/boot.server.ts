import { APP_BASE_HREF } from '@angular/common';
import { ApplicationRef, NgZone, enableProdMode } from '@angular/core';
import {
	INITIAL_CONFIG,
	PlatformState,
	platformDynamicServer
} from '@angular/platform-server';
import { RenderResult, createServerRenderer } from 'aspnet-prerendering';
import 'reflect-metadata';
import { first } from 'rxjs/operators';
import 'zone.js';
import { AppModule } from './app/app.module.server';

enableProdMode();

export default createServerRenderer(params => {
	const providers = [
		{
			provide: INITIAL_CONFIG,
			useValue: { document: '<deputy-app></deputy-app>', url: params.url }
		},
		{ provide: APP_BASE_HREF, useValue: params.baseUrl },
		{ provide: 'BASE_URL', useValue: params.origin + params.baseUrl }
	];

	return platformDynamicServer(providers)
		.bootstrapModule(AppModule)
		.then(moduleRef => {
			const appRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);
			const state: PlatformState = moduleRef.injector.get(PlatformState);
			const zone: NgZone = moduleRef.injector.get(NgZone);

			return new Promise<RenderResult>((resolve, reject) => {
				zone.onError.subscribe((errorInfo: any) => reject(errorInfo));
				appRef.isStable.pipe(first(isStable => isStable)).subscribe(() => {
					// Because 'onStable' fires before 'onError', we have to delay slightly before
					// completing the request in case there's an error to report
					setImmediate(() => {
						resolve({
							html: state.renderToString()
						});
						moduleRef.destroy();
					});
				});
			});
		});
});
