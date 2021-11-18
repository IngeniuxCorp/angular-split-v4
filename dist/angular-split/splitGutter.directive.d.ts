import { ElementRef, Renderer2 } from '@angular/core';
export declare class SplitGutterDirective {
    private elementRef;
    private renderer;
    order: number;
    private _direction;
    direction: string;
    size: any;
    private _disabled;
    disabled: boolean;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    private refreshStyle;
    private setStyle;
    private getCursor;
    private getImage;
}
