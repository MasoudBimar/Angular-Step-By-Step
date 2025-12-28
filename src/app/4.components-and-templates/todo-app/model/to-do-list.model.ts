
export class TodoList<T extends { isComplete: boolean }> {
  constructor(private todoItems: T[] = []) {
  }

  get openItems(): T[] {
    return this.todoItems.filter(x => x.isComplete === false);
  }

  get doneItems(): T[] {
    return this.todoItems.filter(x => x.isComplete === true);
  }

  addNewItem(item: T) {
    this.todoItems.push(item);
  }
}
