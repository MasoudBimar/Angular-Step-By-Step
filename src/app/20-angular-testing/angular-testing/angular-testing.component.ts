import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AngularTestingService, User } from './angular-testing.service';

@Component({
  selector: 'app-angular-testing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular-testing.component.html',
  styleUrl: './angular-testing.component.scss'
})
export class AngularTestingComponent {
  @Input() title = 'Angular Testing Playground';
  @Input() items: string[] = ['Apples', 'Bananas'];
  @Output() saved = new EventEmitter<string>();

  count = 0;
  isOpen = false;
  errorMessage = '';
  users: User[] = [];
  lastSaved = '';

  private testingService = inject(AngularTestingService);

  increment() {
    this.count += 1;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  get statusMessage(): string {
    return this.count > 0 ? 'Active' : 'Idle';
  }

  addItem(name: string) {
    const trimmed = name.trim();
    if (!trimmed) {
      this.errorMessage = 'Name required';
      return;
    }
    this.items = [...this.items, trimmed];
    this.errorMessage = '';
  }

  save() {
    this.lastSaved = `Saved ${this.count}`;
    this.saved.emit(this.lastSaved);
  }

  loadUsers() {
    this.errorMessage = '';
    this.testingService.getUsers().subscribe({
      next: users => (this.users = users),
      error: () => (this.errorMessage = 'Failed to load users')
    });
  }

  trackByName(_index: number, name: string) {
    return name;
  }

}
