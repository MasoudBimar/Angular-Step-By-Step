import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from "@angular/forms";

/**
 * Validates that a form control value falls within a specified range.
 *
 * @param high - The maximum allowed value (inclusive)
 * @param low - The minimum allowed value (inclusive)
 * @returns A validator function that checks if the control value is between low and high
 *
 * @example
 * ```typescript
 * const control = new FormControl('', hiLowValidator(100, 0));
 * ```
 *
 * @remarks
 * - Returns null if the value is null, undefined, or empty string
 * - Converts the value to a number before validation
 * - Returns a validation error object with the shape `{ hilow: { high, low, actualValue } }` if validation fails
 * - Returns null if validation passes
 */
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
  standalone: true
})
/**
 * Angular directive that validates form control values against high and low boundaries.
 *
 * This directive implements custom validation by checking that a form control's value
 * falls within the specified high and low range. It supports string and numeric inputs,
 * automatically converting strings to numbers during validation setup.
 *
 * @example
 * ```html
 * <input formControl="age" appHiLow [high]="100" [low]="0" />
 * ```
 *
 * @implements {Validator}
 * @implements {OnChanges}
 */
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
