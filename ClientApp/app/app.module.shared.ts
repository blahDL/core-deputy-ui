import {
	NgModule,
	APP_INITIALIZER,
	PLATFORM_ID,
	Injector
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { RosterComponent } from './components/roster/roster.component';
import { DeputyService } from './services/deputy.service';
import { AuthService } from './services/auth.service';
import { ModalComponent } from './components/modal/modal.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard.service';

@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		RosterComponent,
		ModalComponent,
		LoginComponent
	],
	entryComponents: [ModalComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot([
			{ path: '', redirectTo: 'login', pathMatch: 'full' },
			{ path: 'login', component: LoginComponent },
			{ path: 'roster', component: RosterComponent, canActivate: [AuthGuard] },
			{ path: '**', redirectTo: 'login' }
		]),
		LocalStorageModule.withConfig({
			prefix: 'deputy-ui',
			storageType: 'sessionStorage'
		})
	],
	providers: [
		AuthService,
		AuthGuard,
		DeputyService,
		{
			provide: APP_INITIALIZER,
			multi: true,
			deps: [AuthService],
			useFactory: (auth: AuthService) => {
				return () => auth.ensureLoggedIn();
			}
		},
		{
			provide: HTTP_INTERCEPTORS,
			multi: true,
			useClass: AuthInterceptor
		}
	]
})
export class AppModuleShared {}
