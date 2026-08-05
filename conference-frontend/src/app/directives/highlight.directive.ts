import {
  Directive,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false,
})
export class HighlightDirective {
  @HostBinding('style.backgroundColor')
  backgroundColor = '';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.backgroundColor = '#f2f4ff';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.backgroundColor = '';
  }
}
