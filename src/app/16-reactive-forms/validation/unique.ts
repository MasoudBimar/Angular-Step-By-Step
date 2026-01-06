import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export function uniqueChildValidator(
  control: AbstractControl
): ValidationErrors | null {
  return control.parent?.hasError("unique") ? { "unique-child": {} } : null;
}

export function uniqueArrayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormArray)) {
      return null;
    }

    const duplicateControls: AbstractControl[] = [];
    const uniqueControls: AbstractControl[] = [];

    control.controls.forEach((child, index) => {
      const childValue = String(child.value ?? "").trim();
      if (!childValue) {
        uniqueControls.push(child);
        return;
      }

      const isDuplicate = control.controls.some((target, targetIndex) => {
        if (targetIndex === index) {
          return false;
        }
        const targetValue = String(target.value ?? "").trim();
        return targetValue && targetValue === childValue;
      });

      if (isDuplicate) {
        duplicateControls.push(child);
      } else {
        uniqueControls.push(child);
      }
    });

    Promise.resolve().then(() => {
      duplicateControls.forEach((child) => {
        if (!child.hasValidator(uniqueChildValidator)) {
          child.markAsDirty();
          child.addValidators(uniqueChildValidator);
        }
        child.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      });

      uniqueControls.forEach((child) => {
        if (child.hasValidator(uniqueChildValidator)) {
          child.removeValidators(uniqueChildValidator);
        }
        child.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      });
    });

    return duplicateControls.length > 0 ? { unique: {} } : null;
  };
}
