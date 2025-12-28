import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../model/to-do-item.model';
import { TodoItemService } from '../services/todo-item.service';
import { TodoList } from '../model/to-do-list.model';

@Component({
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
    if (this.currentItem.length > 0) {
      this.list.addNewItem(new TodoItem(this.currentItem));
      this.currentItem = '';
    }
  }

}
