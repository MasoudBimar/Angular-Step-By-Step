import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule, NgTemplateOutlet],
  selector: 'app-special-elements',
  templateUrl: './special-elements.component.html',
  styleUrls: ['./special-elements.component.scss']
})
export class SpecialElementsComponent {
  nm = '';
  em = '';
  ph = '';
  add = '';
  submitted = false;
  showHeading = true;
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
