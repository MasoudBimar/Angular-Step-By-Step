
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.scss']
})
export class MultiStepFormComponent {

  formStep: number = 0;
  readonly formBuider = inject(FormBuilder);
  readonly multiStepForm: FormGroup = this.formBuider.group({
    userDetail: this.formBuider.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }),
    additionalDetail: this.formBuider.group({
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    }),
    feedback: this.formBuider.group({
      comment: [''],
    })
  })

  submitForm() {

    if (this.multiStepForm.valid) {
      console.log(this.multiStepForm.value);
      this.multiStepForm.reset();
    } else {
      this.multiStepForm.markAllAsTouched();
    }
  }

  goBack() {
    if (this.formStep > 0) {
      this.formStep--;
    }
  }

  goForward() {
    // const userDetailGroup = this.multiStepForm.get('userDetail');
    // const additionalDetailGroup = this.multiStepForm.get('additionalDetail');
    if (this.formStep === 0 && this.userDetailForm?.invalid) {
      this.userDetailForm.markAllAsTouched();
      return;
    }
    if (this.formStep === 1 && this.additionalDetailForm?.invalid) {
      this.additionalDetailForm.markAllAsTouched();
      return;
    }
    if (this.formStep < 2) {
      this.formStep++;
    }
  }

  get userDetailForm() {
    return this.multiStepForm.get('userDetail') as FormGroup;
  }

  get additionalDetailForm() {
    return this.multiStepForm.get('additionalDetail') as FormGroup;
  }

}
