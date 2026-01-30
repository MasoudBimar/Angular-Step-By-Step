import { Component } from '@angular/core';
import { CodeHighlighterComponent } from '../shared/code-highlighter/code-highlighter.component';

@Component({
  imports: [CodeHighlighterComponent],
  selector: 'app-decorators',
  templateUrl: './decorators.component.html',
  styleUrls: ['./decorators.component.scss']
})
export class DecoratorsComponent {
  readonly componentCode = `@Component({
  selector: 'app-profile-card',
  imports: [CommonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {}`;

  readonly directiveCode = `@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}`;

  readonly pipeCode = `@Pipe({ name: 'initials'})
export class InitialsPipe implements PipeTransform {
  transform(value: string) {
    return value
      .split(' ')
      .map((part) => part[0])
      .join('');
  }
}`;

  readonly injectableCode = `@Injectable({ providedIn: 'root' })
export class MovieService {
  getAll() {
    return this.http.get('/api/movies');
  }

  constructor(private http: HttpClient) {}
}`;

  readonly ngModuleCode = `@NgModule({
  declarations: [LegacyCardComponent],
  imports: [CommonModule],
  exports: [LegacyCardComponent],
})
export class SharedModule {}`;

  readonly inputOutputCode = `export class RatingBadgeComponent {
  @Input({ required: true }) value = 0;
  @Output() valueChange = new EventEmitter();

  update(next: number) {
    this.value = next;
    this.valueChange.emit(next);
  }
}`;

  readonly viewChildCode = `@ViewChild('search') searchInput!: ElementRef;
@ViewChildren(ItemCardComponent) cards!: QueryList;

ngAfterViewInit() {
  this.searchInput.nativeElement.focus();
}`;

  readonly contentChildCode = `@ContentChild('title') titleTpl?: TemplateRef;
@ContentChildren(TabComponent) tabs!: QueryList;

ngAfterContentInit() {
  this.activeTab = this.tabs.first;
}`;

  readonly hostBindingCode = `@HostBinding('class.is-active') isActive = false;

@HostListener('mouseenter')
onEnter() {
  this.isActive = true;
}

@HostListener('mouseleave')
onLeave() {
  this.isActive = false;
}`;

  readonly diParameterCode = `constructor(
  @Optional() @Inject(API_URL) apiUrl: string | null,
  @SkipSelf() private parent: ParentService,
  @Self() private local: LocalService,
  @Host() private host: HostService
) {}`;
}
