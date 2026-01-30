# Angular Template-driven Forms

## Table of contents

- [Angular Template-driven Forms](#angular-template-driven-forms)
  - [Table of contents](#table-of-contents)
  - [Setup](#setup)
  - [Basic form example](#basic-form-example)
  - [`ngSubmit` (simple submit example)](#ngsubmit-simple-submit-example)
  - [`ngForm` directive vs. `NgForm` class](#ngform-directive-vs-ngform-class)
  - [Validation and control state](#validation-and-control-state)
  - [Grouping with `ngModelGroup` (FormGroup)](#grouping-with-ngmodelgroup-formgroup)
  - [Accessing `FormControl` in a template-driven form](#accessing-formcontrol-in-a-template-driven-form)
  - [FormArray (dynamic lists)](#formarray-dynamic-lists)

> [!NOTE]
> Template-driven forms still use `FormControl` and `FormGroup` internally. You
> can access them from `NgForm` if you need programmatic control.

Template-driven forms are built mostly in the template using directives like
`ngForm` and `ngModel`. They are a good fit for small to medium forms where the
logic is simple and the structure is known ahead of time.

> [!NOTE]
> ngForm is a built-in directive provided by FormsModule

## Setup

Import `FormsModule` once in the module that declares your component.

```ts
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [FormsModule],
})
export class AppModule {}
```

## Basic form example

```html
<form #contactForm="ngForm" (ngSubmit)="save(contactForm)">
  <label>
    Name
    <input name="name" ngModel required minlength="2" />
  </label>

  <label>
    Email
    <input name="email" ngModel required email />
  </label>

  <button type="submit" [disabled]="contactForm.invalid">Save</button>
</form>

<pre>Valid: {{ contactForm.valid }}</pre>
<pre>Value: {{ contactForm.value | json }}</pre>
```

```ts
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
})
export class ContactComponent {
  save(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    console.log("Submit", form.value);
  }
}
```

## `ngSubmit` (simple submit example)

ngSubmit is a Directive is generally used for HTMLFormElement to bind method for sunbmitting event.

`ngSubmit` fires when the form is validly submitted (enter key or button with
`type="submit"`). The event gives you access to the `NgForm`.

```html
<form #loginForm="ngForm" (ngSubmit)="login(loginForm)">
  <label>
    Username
    <input name="username" ngModel required />
  </label>

  <label>
    Password
    <input name="password" ngModel required type="password" />
  </label>

  <button type="submit">Login</button>
</form>
```

> [!NOTE] > `NgForm` includes `Form Validation`, `Sunmission`, `Reset`, `Error Handling` and basically everything we need to handle a template driven form state.
> To Access its functionalities we need to assign it to HTMLFOrmElement using `#form="ngForm"`

```ts
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  login(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    console.log("Login", form.value);
  }
}
```

## `ngForm` directive vs. `NgForm` class

**Ngform** is a class provided by the Angular FormsModule. it provides various properties & methods to manage form in ts file

**ngForm** is a directive provided by angular to create an instance of `NgForm` class

## Validation and control state

```html
<label>
  Email
  <input name="email" ngModel required email #email="ngModel" />
</label>

@if(email.invalid && email.touched){
<p>Please provide a valid email.</p>
}
```

`ngModel` exposes useful flags:

- `valid` / `invalid`
- `touched` / `untouched`
- `dirty` / `pristine`

## Grouping with `ngModelGroup` (FormGroup)

```html
<form #profileForm="ngForm" (ngSubmit)="save(profileForm)">
  <div ngModelGroup="address">
    <label>
      Street
      <input name="street" ngModel />
    </label>
    <label>
      City
      <input name="city" ngModel />
    </label>
  </div>
</form>
```

```ts
import { Component, ViewChild } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent {
  @ViewChild("profileForm") profileForm?: NgForm;

  get addressGroup(): FormGroup | null {
    return (this.profileForm?.control.get("address") as FormGroup) ?? null;
  }
}
```

## Accessing `FormControl` in a template-driven form

You can access the underlying `FormControl` from `NgForm.controls` when you
need to update or inspect a control programmatically.

```ts
import { Component, ViewChild } from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
})
export class ContactComponent {
  @ViewChild("contactForm") contactForm?: NgForm;

  get emailControl(): FormControl | null {
    return (this.contactForm?.controls["email"] as FormControl) ?? null;
  }
}
```

## FormArray (dynamic lists)

Template-driven forms do not have a built-in `FormArray` directive. For dynamic
lists of controls (add/remove rows), switch to **Reactive Forms** so you can
use `FormArray` directly.

```ts
import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-skills",
  template: `
    <form [formGroup]="form">
      <div formArrayName="skills">
        @for (ctrl of skills.controls; track $index; let i = $index) {
          <label>
            Skill {{ i + 1 }}
            <input [formControlName]="i" />
          </label>
        }
      </div>
      <button type="button" (click)="addSkill()">Add skill</button>
    </form>
  `,
})
export class SkillsComponent {
  form = new FormGroup({
    skills: new FormArray<FormControl<string>>([new FormControl("", { nonNullable: true })]),
  });

  get skills(): FormArray<FormControl<string>> {
    return this.form.get("skills") as FormArray<FormControl<string>>;
  }

  addSkill(): void {
    this.skills.push(new FormControl("", { nonNullable: true }));
  }
}
```

> [!TIP]
> If the form is simple and mostly static, template-driven forms are quick and
> readable. For complex or dynamic forms, reactive forms are more maintainable.

Next Section: [Reactive Forms](/src/app/16-reactive-forms/README.md)
