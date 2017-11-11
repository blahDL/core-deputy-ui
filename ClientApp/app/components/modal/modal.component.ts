﻿import { Component } from '@angular/core';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html'
})
export class ModalComponent {
	public visible = false;
	public visibleAnimate = false;

	public show(): void {
		this.visible = true;
		setTimeout(() => this.visibleAnimate = true, 100);
	}

	public hide(): void {
		this.visibleAnimate = false;
		setTimeout(() => this.visible = false, 300);
	}
}