import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from "@angular/forms";

export function hiLowValidator(high: number, low: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rawValue = control.value;
    if (rawValue === null || rawValue === undefined || rawValue === "") {
      return null;
    }

    const value = Number(rawValue);
    if (Number.isNaN(value) || value > high || value < low) {
      return { hilow: { high, low, actualValue: value } };
    }
    return null;
  };
}

@Directive({
  selector: "input[high][low]",
  providers: [{ provide: NG_VALIDATORS, useExisting: HiLowValidatorDirective, multi: true }],
})
export class HiLowValidatorDirective implements Validator, OnChanges {
  @Input()
  high: number | string | undefined;

  @Input()
  low: number | string | undefined;

  validator?: (control: AbstractControl) => ValidationErrors | null;

  ngOnChanges(changes: SimpleChanges): void {
    if ("high" in changes || "low" in changes) {
      const highValue =
        typeof this.high === "string" ? Number(this.high) : this.high;
      const lowValue =
        typeof this.low === "string" ? Number(this.low) : this.low;

      this.validator = hiLowValidator(
        typeof highValue === "number" && Number.isFinite(highValue) ? highValue : Number.MAX_VALUE,
        typeof lowValue === "number" && Number.isFinite(lowValue) ? lowValue : 0
      );
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator?.(control) ?? null;
  }
}
