import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem } from '../model/to-do-item.model';
import { TodoItemService } from '../services/todo-item.service';
import { TodoList } from '../model/to-do-list.model';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {

  list: TodoList<TodoItem>;

  currentItem!: string;

  constructor(public todoItemService: TodoItemService) {
    this.list = this.todoItemService.getItems();
  }

  addNewItem() {
    const trimmedItem = this.currentItem?.trim();
    if (trimmedItem) {
      this.list.addNewItem(new TodoItem(trimmedItem));
      this.currentItem = '';
    }
  }

}
