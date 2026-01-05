import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatedriveComponent } from './templatedrive.component';

describe('TemplatedriveComponent', () => {
  let component: TemplatedriveComponent;
  let fixture: ComponentFixture<TemplatedriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatedriveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatedriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
