import { AbstractControl, ValidationErrors } from "@angular/forms";

/**
 * Validator function that automatically converts the control's value to uppercase.
 *
 * This validator checks if the current value is not already in uppercase format.
 * If not, it updates the control's value to uppercase and then returns null,
 * indicating that the validation passed.
 *
 * @param control - The abstract control to validate and potentially modify
 * @returns Always returns null as this validator doesn't produce validation errors
 */
export function convertToUpperCaseValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (value !== value.toUpperCase()) {
    control.setValue(value.toUpperCase());
  }
  return null;

}
