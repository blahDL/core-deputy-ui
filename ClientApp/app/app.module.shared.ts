import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { RosterComponent } from "./components/roster/roster.component";
import { DeputyService } from "./services/deputy.service";
import { ModalComponent } from "./components/modal/modal.component";

@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		RosterComponent,
		ModalComponent
	],
	imports: [
		CommonModule,
		HttpModule,
		FormsModule,
		RouterModule.forRoot([
			{ path: "", redirectTo: "roster", pathMatch: "full" },
			{ path: "roster", component: RosterComponent },
			{ path: "**", redirectTo: "roster" }
		])
	],
	providers: [DeputyService]
})
export class AppModuleShared { }
