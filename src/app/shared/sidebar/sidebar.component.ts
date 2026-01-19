
import { ArrayType } from '@angular/compiler';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarItem {
  id: string;
  label: string;
  route?: string;
  children?: SidebarItem[];
}

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  readonly menuItems: SidebarItem[] = [
    { id: 'getting-started', label: 'Getting Started' },
    {
      id: 'typescript', label: 'typescript'
    },
    {
      id: 'Fundamentals', label: 'Fundamentals', children: [
        { id: 'data-binding', label: 'basic-sample', route: '/data-binding' },
        { id: 'counter', label: 'Counter', route: '/counter' },
      ]
    },
    {
      id: 'ComponentAndTemplate', label: 'Component and Template',
      children: [
        { id: 'todo', label: 'Todo App', route: '/to-do' },
        // { id: 'data-event', label: 'Display Data - Handling Event', route: 'data-event' },
        { id: 'components', label: 'Components', route: '/component-template' },
      ]
    },
    {
      id: 'directives',
      label: 'Directives',
      children: [
        { id: 'structural-directive', label: 'Structural Directive', route: '/structural-directive' },
        { id: 'attribute-directive', label: 'Attribute Directive', route: '/attribute-directive' },
        { id: 'component-directive', label: 'Component Directive', route: '/component-directive' },
        { id: 'custom-directive', label: 'Custom Directive', route: '/custom-directive' }
      ]
    },
    { id: 'special-elements', label: 'Special Elements', route: '/special-elements' },
    { id: 'life-cycle', label: 'Lifecycle Hooks', route: '/life-cycle' },
    {
      id: 'decorators',
      label: 'Decorators',
      children: [
        { id: 'decorators-link', label: 'Angular Decorators', route: '/decorators' },
        { id: 'color-picker', label: 'Color Picker', route: '/color-picker' }
      ]
    },
    {
      id: 'pipes',
      label: 'Pipes',
      children: [
        { id: 'pipes-link', label: 'Angular Pipes', route: '/pipes' },
        { id: 'paginated-post-collection', label: 'Paginated Post Collection', route: '/paginated-post-collection' }
      ]
    },
    { id: 'routing', label: 'Angular Routing', route: 'routing' },
    { id: 'services', label: 'Angular Services', route: 'services' },
    {
      id: 'template-forms',
      label: 'Template Forms',
      children: [
        { id: 'template-driven', label: 'Template Driven Form', route: '/template-driven/template-driven' },
        { id: 'full-template-driven', label: 'Full Template Driven Form', route: '/template-driven/full-template-driven' },
        { id: 'product-sample', label: 'Product Sample', route: '/template-driven/product-sample' }
      ]
    },
    {
      id: 'reactive-forms',
      label: 'reactive Forms',
      children: [
        { id: 'reactive-forms', label: 'Reactive Forms', route: '/reactive-form/basic-reactive-form' },
        { id: 'full-reactive-forms', label: 'Full Reactive Form', route: '/reactive-form/full-reactive-form' },
        { id: 'reactive-forms-array', label: 'Reactive Form Array', route: '/reactive-form/reactive-form-array' },
        { id: 'multi-step-reactive-form', label: 'Multi Step Reactive Form', route: '/reactive-form/multi-step-reactive-form' }
      ]
    },
    { id: 'defer-loading', label: 'Defer Loading', route: 'defer-loading' },
    {
      id: 'code samples', label: 'exercises', children: [
        { id: 'rate-1', label: 'Rate 1', route: '/exercise/rate-1' },
        { id: 'rate-2', label: 'Rate 2', route: '/exercise/rate-2' },
        { id: 'rate-3', label: 'Rate 3', route: '/exercise/rate-3' },
        { id: 'movies', label: 'Movies', route: '/exercise/movies' },
        { id: 'signal-counter', label: 'Signal Counter', route: '/exercise/signal-counter' },
        { id: 'signal-todo', label: 'Signal Todo', route: '/exercise/signal-todo' },
      ]
    }
  ];

  private expandedItems = new Set<string>();

  constructor(private router: Router) { }

  toggle(item: SidebarItem): void {
    if (!item.children?.length) {
      return;
    }

    if (this.expandedItems.has(item.id)) {
      this.expandedItems.delete(item.id);
      return;
    }

    this.expandedItems.add(item.id);
  }

  isExpanded(item: SidebarItem): boolean {
    return this.expandedItems.has(item.id) || this.isChildActive(item);
  }

  isChildActive(item: SidebarItem): boolean {
    return !!item.children?.some(child => child.route && this.router.isActive(this.normalizeRoute(child.route), false));
  }

  private normalizeRoute(route: string): string {
    return route.startsWith('/') ? route : `/${route}`;
  }
}
