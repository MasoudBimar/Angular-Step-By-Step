import { TodoItem } from './to-do-item.model';

export class TodoList{
    /**
     *
     */
    constructor(private todoItems: TodoItem[] = []) {
    }

    get openItems(): TodoItem[] {
        // console.log('>>>>>>>>>>> getting items');
        return this.todoItems.filter(x => x.isComplete === false);
    }

    get doneItems(): TodoItem[] {
        // console.log('>>>>>>>>>>> getting items');
        return this.todoItems.filter(x => x.isComplete === true);
    }

    addTodoItem(item: TodoItem){
        this.todoItems.push(item);
    }

    addItem(title: string){
        this.todoItems.push(new TodoItem(title));
    }
}