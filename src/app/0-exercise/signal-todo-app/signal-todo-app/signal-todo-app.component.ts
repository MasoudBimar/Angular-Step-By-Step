
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem } from '../model/to-do-item.model';
import { TodoItemService } from '../service/todo-item.service';

@Component({
  selector: 'app-signal-todo-app',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signal-todo-app.component.html',
  styleUrl: './signal-todo-app.component.scss'
})
export class SignalTodoAppComponent {
  private readonly todoItemService = inject(TodoItemService);
  protected readonly list: WritableSignal<TodoItem[]> = signal<TodoItem[]>(
    this.todoItemService.getItems() || []
  );
  protected readonly openItems = computed(() =>
    this.list().filter((item) => !item.isComplete)
  );
  protected readonly doneItems = computed(() =>
    this.list().filter((item) => item.isComplete)
  );

  addNewItem(input: HTMLInputElement) {
    const trimmedItem = input.value.trim();
    if (trimmedItem) {
      this.list.update((items: TodoItem[]) => [new TodoItem(trimmedItem), ...items]);
    }

    input.value = '';
    input.focus();
  }

  removeItem(item: TodoItem) {
    if (item) {
      this.list.update((items: TodoItem[]) =>
        items.filter((current) => current.id !== item.id)
      );
    }
  }

  toggleItemStatus(taskItem: TodoItem): void {
    this.list.update((items: TodoItem[]) =>
      items.map((item) =>
        item.id === taskItem.id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  }

  trackById(index: number, item: TodoItem) {
    return item.id;
  }
}
