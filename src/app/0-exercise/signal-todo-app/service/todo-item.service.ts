import { Injectable } from '@angular/core';
import { TodoItem } from '../model/to-do-item.model';

@Injectable({
  providedIn: 'root'
})

export class TodoItemService {


  getItems() {
    return [
      new TodoItem('call ali'),
      new TodoItem('call mohsen'),
      new TodoItem('call hasan'),
      new TodoItem('call reza'),
      new TodoItem('call nader')
    ];

  }
}
