import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../to-do-item.model';
import { TodoList } from '../to-do-list.model';
import { TodoItemService } from '../todo-item.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  list: any;
  // =
  //  new TodoList([
  //   new TodoItem('call ali'),
  //   new TodoItem('call mohsen'),
  //   new TodoItem('call hasan'),
  //   new TodoItem('call reza'),
  //   new TodoItem('call nader')
  // ]);


  currentItem!: string;

  constructor(public todoItemService: TodoItemService) {
    console.log('*********************')
  }

  ngOnInit(): void {
    this.list = this.todoItemService.getItems();
  }

  addNewItem() {
    if (this.currentItem.length > 0) {
      this.list.addItem(this.currentItem);
      this.currentItem = '';
    }
  }

}
