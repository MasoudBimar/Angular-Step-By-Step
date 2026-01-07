import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Creates a validator function that checks if a form control's value does not exceed a specified limit.
 *
 * @param limit - The maximum allowed value for the control
 * @returns A validator function that returns a validation error object with the limit and actual value if the control value exceeds the limit, or null if validation passes
 */
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
