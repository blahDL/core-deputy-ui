import { NgModule, APP_INITIALIZER, PLATFORM_ID, Injector } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { RosterComponent } from "./components/roster/roster.component";
import { DeputyService } from "./services/deputy.service";
import { AuthService } from "./services/auth.service";
import { ModalComponent } from "./components/modal/modal.component";
import { AuthInterceptor } from "./services/auth.interceptor";

@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		RosterComponent,
		ModalComponent
	],
	entryComponents: [
		ModalComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot([
			{ path: "", redirectTo: "roster", pathMatch: "full" },
			{ path: "roster", component: RosterComponent },
			{ path: "**", redirectTo: "roster" }
		]),
		LocalStorageModule.withConfig({
			prefix: 'deputy-ui',
			storageType: 'sessionStorage'
		})
	],
	providers: [AuthService,
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
		}]
})
export class AppModuleShared { }
