import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { RosterComponent } from './components/roster/roster.component';
import { DeputyService } from './services/deputy.service';

@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		RosterComponent,
		ModalComponent
	],
	entryComponents: [ModalComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot([{ path: '**', component: RosterComponent }])
	],
	providers: [DeputyService]
})
export class AppModuleShared {}
