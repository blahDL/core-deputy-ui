import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AccessTokenResponse } from "../../models/AccessTokenResponse";

@Component({
	styleUrls: ['./login.component.scss'],
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	accessToken?: AccessTokenResponse;

	constructor(private authService: AuthService, private router:Router) { }

	ngOnInit() {
		this.accessToken = this.authService.retrieveAccessToken();

		if (this.authService.isLoggedIn()) {
			this.router.navigate(['/roster']);
		}
	}

	retry() {
		this.authService.logout();
	}
}