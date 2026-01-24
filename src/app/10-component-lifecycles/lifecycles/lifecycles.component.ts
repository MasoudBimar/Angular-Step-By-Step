import { CommonModule } from '@angular/common';
import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CodeHighlighterComponent } from 'src/app/shared/code-highlighter/code-highlighter.component';

@Component({
  standalone: true,
  imports: [CommonModule, CodeHighlighterComponent],
  selector: 'app-lifecycles',
  templateUrl: './lifecycles.component.html',
  styleUrls: ['./lifecycles.component.scss']
})
export class LifecyclesComponent implements OnInit, OnDestroy, DoCheck, OnChanges {
  @Input() inputs!: any;

  readonly onChangesCode = `ngOnChanges(changes: SimpleChanges) {
  if (changes['userId']) {
    this.loadUser(changes['userId'].currentValue);
  }
}`;

  readonly onInitCode = `ngOnInit() {
  this.status = 'ready';
  this.loadDashboard();
  this.sub = this.userService.user$.subscribe();
}`;

  readonly doCheckCode = `ngDoCheck() {
  if (this.items.length !== this.prevCount) {
    this.prevCount = this.items.length;
    this.recalculateTotals();
  }
}`;

  readonly afterContentInitCode = `ngAfterContentInit() {
  this.projectedTitle = this.contentTitle?.text;
}`;

  readonly afterContentCheckedCode = `ngAfterContentChecked() {
  this.syncProjectedState();
}`;

  readonly afterViewInitCode = `ngAfterViewInit() {
  this.searchInput?.nativeElement.focus();
}`;

  readonly afterViewCheckedCode = `ngAfterViewChecked() {
  this.alignTooltip();
}`;

  readonly onDestroyCode = `ngOnDestroy() {
  this.sub?.unsubscribe();
  clearInterval(this.timerId);
}`;

  ngOnInit(): void {
    console.log('onInit called');
  }

  ngOnDestroy(): void {
    console.log('onDestroy called');
  }
  ngDoCheck(): void {
    console.log('docheck called');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.inputs, changes);
  }
}
