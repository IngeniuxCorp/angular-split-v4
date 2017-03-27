import { Injectable } from '@angular/core';
import { CookieService } from './cookieService';

export class SplitAreaState {
	size: number;
	visible: boolean;
}

@Injectable()
export class SplitStateService {

	splitName = "AngularSplit";

	constructor(private cookieService: CookieService) {
	}

	saveState(visibleAreaStates: SplitAreaState[]) {
		this.cookieService.set(this.splitName, JSON.stringify(visibleAreaStates));
	}

	loadState(): SplitAreaState[] {
		const cookieVal = this.cookieService.get(this.splitName);
		return cookieVal ? JSON.parse(cookieVal) : null;
	}
}