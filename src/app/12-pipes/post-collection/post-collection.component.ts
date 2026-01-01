import { Component } from '@angular/core';

@Component({
  selector: 'app-post-collection',
  templateUrl: './post-collection.component.html',
  styleUrls: ['./post-collection.component.scss']
})
export class PostCollectionComponent {
  pageSize: number = 4;
  startIndex: number = 0;
  endIndex: number = this.pageSize;
  posts = [
    {
      title: 'Building an Angular Dashboard',
      imageUrl: 'https://picsum.photos/seed/post-1/600/360'
    },
    {
      title: 'TypeScript Tips for Cleaner Components',
      imageUrl: 'https://picsum.photos/seed/post-2/600/360'
    },
    {
      title: 'State Management Without the Boilerplate',
      imageUrl: 'https://picsum.photos/seed/post-3/600/360'
    },
    {
      title: 'RxJS Patterns You Can Use Today',
      imageUrl: 'https://picsum.photos/seed/post-4/600/360'
    },
    {
      title: 'Routing Strategies for Large Apps',
      imageUrl: 'https://picsum.photos/seed/post-5/600/360'
    },
    {
      title: 'Angular Forms: Dynamic and Validated',
      imageUrl: 'https://picsum.photos/seed/post-6/600/360'
    },
    {
      title: 'Component Composition Done Right',
      imageUrl: 'https://picsum.photos/seed/post-7/600/360'
    },
    {
      title: 'Designing Reusable UI Widgets',
      imageUrl: 'https://picsum.photos/seed/post-8/600/360'
    },
    {
      title: 'Faster Builds with Angular CLI',
      imageUrl: 'https://picsum.photos/seed/post-9/600/360'
    },
    {
      title: 'HTTP Interceptors for Consistent APIs',
      imageUrl: 'https://picsum.photos/seed/post-10/600/360'
    },
    {
      title: 'Standalone Components: A Quick Guide',
      imageUrl: 'https://picsum.photos/seed/post-11/600/360'
    },
    {
      title: 'Signals vs Observables: Practical Notes',
      imageUrl: 'https://picsum.photos/seed/post-12/600/360'
    },
    {
      title: 'Lazy Loading Routes the Easy Way',
      imageUrl: 'https://picsum.photos/seed/post-13/600/360'
    },
    {
      title: 'Crafting Accessible Angular UIs',
      imageUrl: 'https://picsum.photos/seed/post-14/600/360'
    },
    {
      title: 'Angular Animations for Subtle Motion',
      imageUrl: 'https://picsum.photos/seed/post-15/600/360'
    },
    {
      title: 'Testing Components with Jest',
      imageUrl: 'https://picsum.photos/seed/post-16/600/360'
    },
    {
      title: 'End-to-End Flows with Playwright',
      imageUrl: 'https://picsum.photos/seed/post-17/600/360'
    },
    {
      title: 'Optimizing Change Detection',
      imageUrl: 'https://picsum.photos/seed/post-18/600/360'
    },
    {
      title: 'Theming Angular Apps with CSS Variables',
      imageUrl: 'https://picsum.photos/seed/post-19/600/360'
    },
    {
      title: 'Creating a Shared Component Library',
      imageUrl: 'https://picsum.photos/seed/post-20/600/360'
    },
    {
      title: 'Migration Notes for Angular Upgrades',
      imageUrl: 'https://picsum.photos/seed/post-21/600/360'
    },
    {
      title: 'Internationalization Basics',
      imageUrl: 'https://picsum.photos/seed/post-22/600/360'
    },
    {
      title: 'Debugging Zones and Performance',
      imageUrl: 'https://picsum.photos/seed/post-23/600/360'
    },
    {
      title: 'Working with CDK Overlay',
      imageUrl: 'https://picsum.photos/seed/post-24/600/360'
    },
    {
      title: 'Building a Search Experience',
      imageUrl: 'https://picsum.photos/seed/post-25/600/360'
    },
    {
      title: 'Pagination Patterns That Scale',
      imageUrl: 'https://picsum.photos/seed/post-26/600/360'
    },
    {
      title: 'File Uploads with Progress Bars',
      imageUrl: 'https://picsum.photos/seed/post-27/600/360'
    },
    {
      title: 'Server-Side Rendering Essentials',
      imageUrl: 'https://picsum.photos/seed/post-28/600/360'
    },
    {
      title: 'Securing Routes with Guards',
      imageUrl: 'https://picsum.photos/seed/post-29/600/360'
    },
    {
      title: 'Logging and Monitoring for Production',
      imageUrl: 'https://picsum.photos/seed/post-30/600/360'
    }
  ];

  goPreviousPage() {
    this.startIndex += this.pageSize;
    this.endIndex += this.pageSize;
  }
  goNextPage() {
    this.startIndex -= this.pageSize;
    this.endIndex -= this.pageSize;
  }
}
