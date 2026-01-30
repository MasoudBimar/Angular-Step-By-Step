# Event Binding

## Table of contents

- [Event Binding](#event-binding)
  - [Table of contents](#table-of-contents)
  - [Handle common events](#handle-common-events)
  - [Pass event data to the method](#pass-event-data-to-the-method)
  - [Filter events](#filter-events)
  - [Check combo keys](#check-combo-keys)
  - [Notes](#notes)
  - [Event Types](#event-types)
  - [Usefull HTMLInputElement Events \& KeyboardEvent](#usefull-htmlinputelement-events--keyboardevent)

Event binding lets you listen to DOM events and run component methods using `(event)="handler()"`. It is the primary way to react to user actions like clicks, input changes, and keyboard events.

## Handle common events

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-event-binding-demo",
  template: `
    <button (click)="save()">Save</button>
    <input (input)="onInput()" placeholder="Type here" />
    <select (change)="onChange()">
      <option>One</option>
      <option>Two</option>
    </select>
  `,
})
export class EventBindingDemoComponent {
  save(): void {
    console.log("saved");
  }

  onInput(): void {
    console.log("input event fired");
  }

  onChange(): void {
    console.log("selection changed");
  }
}
```

## Pass event data to the method

Use `$event` to access the event object and extract values from the target.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-event-binding-demo",
  template: `
    <input (input)="updateName($event)" placeholder="Name" />
    <button (click)="setAge(21)">Set Age</button>
  `,
})
export class EventBindingDemoComponent {
  name = "";
  age = 0;

  updateName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.name = input.value;
  }

  setAge(value: number): void {
    this.age = value;
  }
}
```

## Filter events

Use a condition in the template or method to respond only when the event matches your criteria.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-event-binding-demo",
  template: `
    <input (keyup)="onKeyup($event)" placeholder="Press Enter only" />
    <button (click)="onClick('save', $event)">Save</button>
  `,
})
export class EventBindingDemoComponent {
  onKeyup(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      console.log("enter pressed");
    }
  }

  onClick(action: string, event: MouseEvent): void {
    if (action === "save" && event.button === 0) {
      console.log("left click save");
    }
  }
}
```

## Check combo keys

Detect key combinations like Ctrl+S or Alt+Enter in the handler.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-event-binding-demo",
  template: ` <textarea (keydown)="handleShortcut($event)"></textarea> `,
})
export class EventBindingDemoComponent {
  handleShortcut(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key.toLowerCase() === "s") {
      event.preventDefault();
      console.log("Ctrl+S");
    }

    if (event.altKey && event.key === "Enter") {
      console.log("Alt+Enter");
    }
  }
}
```

Using event filtering for combo keys directly in the template:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-event-binding-demo",
  template: `
    <input (keydown.shift.y)="handleShift($event)" />
    <input (keydown)="handleEvent($event)" />
  `,
})
export class EventBindingDemoComponent {
  handleShift(event: KeyboardEvent): void {
    console.log("Shift+Y detected", event.key);
  }

  handleEvent(event: KeyboardEvent): void {
    if (event.shiftKey && event.key === "Y") {
      console.log("Shift+Y detected in generic handler");
    }
  }
}
```

## Notes

- Use `$event` to get event details.
- Keep handlers fast; heavy work should be debounced or moved to services.

## Event Types

> [!NOTE]
> The keypress event is combination of key up and key down events.

| MouseEvent | FocusEvent | TouchEvent  | DragEvent | KeyboardEvent |
| :--------: | :--------: | :---------: | :-------: | :-----------: |
|   click    |   focus    | touchstart  |   drag    |   keypress    |
|  mouseup   |    blur    |  touchmove  |   drop    |     keyup     |
| mouseleave |  focusin   | touchcancel |  dragend  |    keydown    |
| mouseover  |  focusout  |  touchend   | dragover  |               |

> [!TIP]
> The keyup event can be usefull in many application areas like form validtion and search functionalities.

## Usefull HTMLInputElement Events & KeyboardEvent

- keypress
- keydown
- keyup
- select
- focus
- input
- cut
- copy
- paste
- blur

Next Section : [Attribute Binding](/src/app/3-angular-fundamentals/Attribute-Binding.md)
