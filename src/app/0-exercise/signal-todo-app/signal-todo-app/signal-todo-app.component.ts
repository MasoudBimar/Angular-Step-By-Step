import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem } from '../model/to-do-item.model';
import { TodoItemService } from '../service/todo-item.service';

@Component({
  selector: 'app-signal-todo-app',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signal-todo-app.component.html',
  styleUrl: './signal-todo-app.component.scss'
})
export class SignalTodoAppComponent implements OnInit {
  protected readonly list = signal<TodoItem[]>([]);
  private readonly todoItemService = inject(TodoItemService);

  protected openItems = computed(() => {
    let items = this.list();
    if (items.length > 0) {
      return items.filter(item => !item.isComplete);
    } else {
      return [];
    }
  });

  protected doneItems = computed(() => {
    let items = this.list();
    if (items.length > 0) {
      return items.filter(item => item.isComplete);
    } else {
      return [];
    }
  });

  ngOnInit(): void {
    this.list.set(this.todoItemService.getItems());
  }

  addNewItem(text: string) {
    console.log(text);
    const trimmedItem = text.trim();
    if (trimmedItem) {
      this.list.update((items: TodoItem[]) => [...items, new TodoItem(trimmedItem)]);
    }
  }

  toggleItemStatus(taskItem: TodoItem): void {
    this.list.update((items: TodoItem[]) =>
      items.map(item => item.id === taskItem.id ? { ...item, isComplete: !item.isComplete } : item)
    )
  }

}
