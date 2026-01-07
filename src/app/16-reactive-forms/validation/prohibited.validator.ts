import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

/**
 * Creates an async validator that prohibits specific terms in form control values.
 *
 * @param terms - An array of terms to be prohibited in the form control value.
 * @returns An async validator function that checks if any prohibited term is present in the control value.
 *
 * @example
 * const validator = prohibitedValidator(['admin', 'test']);
 * const control = new FormControl('', [validator]);
 *
 * @remarks
 * - The validation is case-insensitive
 * - There is a 300ms delay before the validation result is emitted
 * - Returns null if no prohibited terms are found
 * - Returns a validation error object with the matched prohibited term if found
 */
export function prohibitedValidator(terms: string[]): AsyncValidatorFn {
  const normalized = terms.map((term) => term.toLowerCase());

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = String(control.value ?? "").toLowerCase();

    return of(value).pipe(
      delay(300),
      map((current) => {
        const matchIndex = normalized.findIndex((term) => current.includes(term));
        if (matchIndex === -1) {
          return null;
        }
        return { prohibited: { prohibited: terms[matchIndex] } };
      })
    );
  };
}
