# Angular Reactive Forms

## Table of contents

- [Angular Reactive Forms](#angular-reactive-forms)
  - [Table of contents](#table-of-contents)
  - [Setup](#setup)
  - [`FormControl` (standalone control)](#formcontrol-standalone-control)
  - [`FormGroup` (grouped controls)](#formgroup-grouped-controls)
  - [`FormBuilder` (less boilerplate)](#formbuilder-less-boilerplate)
  - [`FormArray` (dynamic lists)](#formarray-dynamic-lists)
  - [Form state (dirty, touched, valid, value)](#form-state-dirty-touched-valid-value)
  - [Updating form values](#updating-form-values)
  - [Built-in validation](#built-in-validation)
  - [Custom validation (sync)](#custom-validation-sync)
  - [Async validation](#async-validation)
  - [Notes](#notes)

Reactive forms are built in TypeScript using `FormControl`, `FormGroup`,
`FormArray`, and `FormBuilder`. They are best for complex forms, dynamic
fields, and advanced validation because the form model is explicit and
testable.

## Setup

Import `ReactiveFormsModule` in the module that declares your component.

```ts
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [ReactiveFormsModule],
})
export class AppModule {}
```

## `FormControl` (standalone control)

Use a single control without a parent form group.

```ts
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-standalone-control",
  template: `
    <label>
      Search
      <input [formControl]="search" />
    </label>
    <p>Value: {{ search.value }}</p>
    <p>Valid: {{ search.valid }}</p>
  `,
})
export class StandaloneControlComponent {
  search = new FormControl("", {
    nonNullable: true,
    validators: [Validators.minLength(2)],
  });
}
```

> [!NOTE]
> FormControl class consider the null value as valid unless we set validators that requires a non-null value and set nonNullable to true.

## `FormGroup` (grouped controls)

```ts
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent {
  profileForm = new FormGroup({
    name: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  submit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    console.log(this.profileForm.value);
  }
}
```

```html
<form [formGroup]="profileForm" (ngSubmit)="submit()">
  <label>
    Name
    <input formControlName="name" />
  </label>
  @if (profileForm.get('name')?.invalid && profileForm.get('name')?.touched) {
    <div>Name is required</div>
  }

  <label>
    Email
    <input formControlName="email" />
  </label>

  <button type="submit">Save</button>
</form>
```

## `FormBuilder` (less boilerplate)

```ts
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });
}
```

## `FormArray` (dynamic lists)

```ts
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
})
export class SkillsComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    skills: this.fb.array<FormControl<string>>([this.fb.control("", { nonNullable: true, validators: [Validators.required] })]),
  });

  get skills(): FormArray<FormControl<string>> {
    return this.form.get("skills") as FormArray<FormControl<string>>;
  }

  addSkill(): void {
    this.skills.push(this.fb.control("", { nonNullable: true }));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
}
```

```html
<form [formGroup]="form">
  <div formArrayName="skills">
    @for (ctrl of skills.controls; let i = $index) {
      <div>
        <input [formControlName]="i" />
        <button type="button" (click)="removeSkill(i)">Remove</button>
      </div>
    }
  </div>
  <button type="button" (click)="addSkill()">Add skill</button>
</form>
```

## Form state (dirty, touched, valid, value)

```html
<pre>dirty: {{ form.dirty }}</pre>
<pre>touched: {{ form.touched }}</pre>
<pre>valid: {{ form.valid }}</pre>
<pre>value: {{ form.value | json }}</pre>
```

Common flags:

- `dirty` / `pristine`
- `touched` / `untouched`
- `valid` / `invalid`

## Updating form values

```ts
// Replace all values for the group (every control must be present).
this.profileForm.setValue({ name: "Alice", email: "alice@example.com" });

// Update only some controls.
this.profileForm.patchValue({ name: "Bob" });

// Update a single control.
this.profileForm.get("email")?.setValue("bob@example.com");

// Reset form state and values.
this.profileForm.reset({ name: "", email: "" });
```

## Built-in validation

```ts
import { Validators } from "@angular/forms";

this.form = this.fb.group({
  name: ["", [Validators.required, Validators.minLength(2)]],
  email: ["", [Validators.required, Validators.email]],
});
```

Template display:

```html
@if (form.get('name')?.errors?.['minlength']) {
  <div>Name must be at least 2 characters</div>
}
```

## Custom validation (sync)

Create a validator function:

```ts
import { AbstractControl, ValidationErrors } from "@angular/forms";

export function noSpaces(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? "");
  return value.includes(" ") ? { noSpaces: true } : null;
}
```

Use it on a control:

```ts
this.form = this.fb.group({
  username: ["", [noSpaces]],
});
```

Template display:

```html
@if (form.get('username')?.errors?.['noSpaces']) {
  <div>No spaces allowed.</div>
}
```

## Async validation

```ts
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

export function uniqueUsernameValidator(taken: string[]): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(taken).pipe(
      delay(300),
      map((list) => (list.includes(control.value) ? { usernameTaken: true } : null))
    );
  };
}
```

Usage:

```ts
this.form = this.fb.group({
  username: ["", [], [uniqueUsernameValidator(["admin", "root"])]],
});
```

Template display:

```html
@if (form.get('username')?.pending) {
  <div>Checking availability...</div>
}
@if (form.get('username')?.errors?.['usernameTaken']) {
  <div>Username is already taken.</div>
}
```

## Notes

- Use `markAllAsTouched()` before submit to show errors.
- `FormBuilder` reduces boilerplate and makes arrays easier to manage.
- Prefer reactive forms for dynamic forms and complex validation.
