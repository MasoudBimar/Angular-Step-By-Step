import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight2]',
  standalone: true
})
export class Highlight2Directive {
  @Input() appHighlight2!:string;
  constructor(private el: ElementRef) {}

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
