import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SidebarItem {
  id: string;
  label: string;
  route?: string;
  children?: SidebarItem[];
}

@Component({
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
        { id: 'data-event', label: 'Display Data - Handling Event', route: 'data-event' },
        { id: 'components', label: 'Components', route: '/components' },
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
    {
      id: 'template-forms',
      label: 'Template Forms',
      children: [
        { id: 'template-driven', label: 'Template Driven Form', route: '/template/template-driven' },
        { id: 'full-template-driven', label: 'Full Template Driven Form', route: '/template/full-template-driven' },
        { id: 'rate-component', label: 'Rate Component', route: '/template/rate' },
        { id: 'product-sample', label: 'Product Sample', route: '/product-sample' }
      ]
    },
    { id: 'reactive-driven', label: 'Reacive Form', route: '/reactive-driven' },
    { id: 'empty-component', label: 'Empty Component', route: '/empty-component' }
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
