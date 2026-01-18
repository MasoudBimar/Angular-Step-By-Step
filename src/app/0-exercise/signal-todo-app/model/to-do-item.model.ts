export class TodoItem {
  id: string;

  constructor(public title: string, public isComplete: boolean = false) {
    this.id = crypto.randomUUID();
  }

}
