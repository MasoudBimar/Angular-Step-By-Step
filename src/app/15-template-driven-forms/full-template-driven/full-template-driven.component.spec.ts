import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTemplateDrivenComponent } from './full-template-driven.component';

describe('FullTemplateDrivenComponent', () => {
  let component: FullTemplateDrivenComponent;
  let fixture: ComponentFixture<FullTemplateDrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullTemplateDrivenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullTemplateDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
