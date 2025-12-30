import { Component } from '@angular/core';

@Component({
  selector: 'app-special-elements',
  templateUrl: './special-elements.component.html',
  styleUrls: ['./special-elements.component.scss']
})
export class SpecialElementsComponent {
  nm = '';
  em = '';
  ph = '';
  add = '';
  submitted: boolean = false;
  showHeading: boolean = true;
  qualification = [{ school: '', degree: '', year: '' }];

  addQualification() {
    this.qualification.push({ school: '', degree: '', year: '' });
  }

  formSubmit() {
    this.submitted = true;
    this.showHeading = false;
  }

  formEdit() {
    this.submitted = false;
    this.showHeading = true;
  }
}
