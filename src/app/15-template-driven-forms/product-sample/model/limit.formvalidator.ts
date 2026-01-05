import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

export class LimitValidator {

  static Limit(limit: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      let val = Number(control.value);
      if (val && val > limit) {
        return { "limit": { "limit": limit, "actualValue": val } };
      } else {
        return null;
      }
    }
  }
}
