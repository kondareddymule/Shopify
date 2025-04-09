import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.element.nativeElement, 'product')
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer')
  }

  @HostListener('mouseleave') OnMouseLeave() {
    this.renderer.removeClass(this.element.nativeElement, 'product')
  }
}
