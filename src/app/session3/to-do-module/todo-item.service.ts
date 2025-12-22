import { Injectable } from '@angular/core';
import { TodoItem } from './to-do-item.model';
import { TodoList } from './to-do-list.model';

@Injectable({
  providedIn: 'root'
})

export class TodoItemService {

  constructor() { }

  getItems(){
    return new TodoList([
      new TodoItem('call ali'),
      new TodoItem('call mohsen'),
      new TodoItem('call hasan'),
      new TodoItem('call reza'),
      new TodoItem('call nader')
    ]);
  
  }
}
