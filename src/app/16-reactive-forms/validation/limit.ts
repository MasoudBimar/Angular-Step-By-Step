import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function limitValidator(limit: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rawValue = control.value;
    if (rawValue === null || rawValue === undefined || rawValue === "") {
      return null;
    }

    const value = Number(rawValue);
    if (Number.isNaN(value) || value > limit) {
      return { limit: { limit, actualValue: value } };
    }

    return null;
  };
}
