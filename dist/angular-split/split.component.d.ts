import { ChangeDetectorRef, ElementRef, SimpleChanges, EventEmitter, Renderer2, OnDestroy, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SplitAreaDirective } from './splitArea.directive';
import { SplitStateService } from './splitStateService';
export interface IAreaData {
    component: SplitAreaDirective;
    sizeUser: number | null;
    size: number;
    orderUser: number | null;
    order: number;
    minPixel: number;
}
export declare class SplitComponent implements OnChanges, OnDestroy {
    private splitStateService;
    private cdRef;
    private elementRef;
    private renderer;
    direction: string;
    width: number;
    height: number;
    gutterSize: number;
    disabled: boolean;
    animateAreaToggle: boolean;
    dragStart: EventEmitter<number[]>;
    dragProgress: EventEmitter<number[]>;
    dragEnd: EventEmitter<number[]>;
    saveStates: boolean;
    name: string;
    private _coverDisplay;
    coverDisplay: Observable<string>;
    private _visibleTransitionEndSub;
    /**
     * This event is fired when split area show/hide are done with animations completed.
     * Make sure use debounceTime and distinctUntilChange before subscription,
     * to handle the fact that adjacent split areas also triggering the event, during show/hide of single area.
     */
    visibleTransitionEnd: Observable<Array<number>>;
    readonly styleFlexDirection: boolean;
    readonly dragging: boolean;
    readonly styleWidth: string;
    readonly styleHeight: string;
    private readonly visibleAreas;
    private readonly nbGutters;
    private minPercent;
    areas: Array<IAreaData>;
    private isDragging;
    private containerSize;
    private areaASize;
    private areaBSize;
    private eventsDragFct;
    constructor(splitStateService: SplitStateService, cdRef: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    addArea(component: SplitAreaDirective, orderUser: number | null, sizeUser: number | null, minPixel: number): void;
    updateArea(component: SplitAreaDirective, orderUser: number | null, sizeUser: number | null, minPixel: number): void;
    removeArea(area: SplitAreaDirective): void;
    hideArea(area: SplitAreaDirective): void;
    showArea(area: SplitAreaDirective): void;
    isLastVisibleArea(area: IAreaData): boolean;
    private refresh;
    private refreshStyleSizes;
    startDragging(startEvent: MouseEvent | TouchEvent, gutterOrder: number): void;
    private dragEvent;
    private drag;
    private stopDragging;
    private _saveState;
    notify(type: string): void;
    ngOnDestroy(): void;
}
