import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective {
    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
    @HostListener('mouseenter') enter() {
        this.renderer.addClass(this.elementRef.nativeElement, 'bg-slate-100')
    }
    @HostListener('mouseleave') leave() {
        this.renderer.removeClass(this.elementRef.nativeElement, 'bg-slate-100')
    }
}