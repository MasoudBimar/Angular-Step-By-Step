import { Component, ElementRef, inject, Input, AfterViewInit, ViewChild } from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-json';

@Component({
  selector: 'app-code-highlighter, [highlighter]',
  standalone: true,
  imports: [],
  template: `<code #codeBlock [class]="'language-' + language"></code>`,
  styleUrl: './code-highlighter.component.scss'
})
export class CodeHighlighterComponent implements AfterViewInit {
  @Input() language = 'html';
  @Input() code: string = '';
  @ViewChild('codeBlock') codeBlock?: ElementRef<HTMLElement>;
  private el = inject(ElementRef);

  ngAfterViewInit(): void {
    if (this.codeBlock) {
      let code = this.code || this.el.nativeElement.innerText;
      code = this.fixIndent(code);
      const grammar = Prism.languages[this.language];
      const html = Prism.highlight(code, grammar, this.language);
      this.codeBlock.nativeElement.innerHTML = html;
    }
  }

  private fixIndent(code: string): string {
    const removeThis = (code.match(/^([ ]+)/) || [])[1];
    if (removeThis) {
      const re = new RegExp(`^${removeThis}`, 'gm');
      return code.replace(re, '');
    }
    return code;
  }
}
