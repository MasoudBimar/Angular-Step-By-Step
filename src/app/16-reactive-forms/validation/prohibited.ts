import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

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
