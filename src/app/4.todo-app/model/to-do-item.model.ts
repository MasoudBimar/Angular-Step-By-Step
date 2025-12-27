export class TodoItem{
    title: string;
    isComplete: boolean;

    /**
     *
     */
    constructor(taskTitle: string, completeValue: boolean = false) {
        this.title = taskTitle;
        this.isComplete = completeValue;

    }

}