import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-defer-loading',
  templateUrl: './defer-loading.component.html',
  styleUrls: ['./defer-loading.component.scss']
})
export class DeferLoadingComponent {
  showOnDemand = false;

  readonly idleTips = [
    'Warm caches while the user reads the page.',
    'Schedule heavy work during idle slots.',
    'Keep critical rendering paths clear.'
  ];

  readonly timedUpdates = [
    'Schedule background sync.',
    'Queue non-essential analytics.',
    'Prepare next-step assets.'
  ];

  readonly immediateHighlights = [
    'Primary navigation ready.',
    'Hero content already hydrated.',
    'Core controls online.'
  ];

  readonly interactionDetails = [
    'Preloaded bundle on hover.',
    'Loaded after user click.',
    'Safe to defer expensive widgets.'
  ];

  readonly hoverPreview = [
    'Peek at upcoming lessons.',
    'Preview resource metadata.',
    'Reveal contextual hints.'
  ];

  readonly onDemandModules = [
    'Student progress chart.',
    'Advanced tooling panel.',
    'Personalized recommendations.'
  ];

  readonly viewportStories = [
    'Feedback cards load on scroll.',
    'Long lists stay light until needed.',
    'Lower sections remain fast.'
  ];
}
