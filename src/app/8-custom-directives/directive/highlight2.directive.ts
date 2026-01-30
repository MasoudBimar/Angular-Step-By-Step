import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight2]',
})
export class Highlight2Directive {
  private el = inject(ElementRef);

  @Input() appHighlight2!: string;

  @HostListener('mouseenter') onMouseEnter() {
    console.log(this.appHighlight2);
    this.highlight(this.appHighlight2 || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
