import { CookieService } from './cookieService';
export declare class SplitAreaState {
    size: number;
    visible: boolean;
}
export declare class SplitStateService {
    private cookieService;
    splitName: string;
    constructor(cookieService: CookieService);
    saveState(visibleAreaStates: SplitAreaState[]): void;
    loadState(): SplitAreaState[];
}
