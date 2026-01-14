import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormFormArraysComponent } from './reactive-form-form-arrays.component';

describe('ReactiveFormFormArraysComponent', () => {
  let component: ReactiveFormFormArraysComponent;
  let fixture: ComponentFixture<ReactiveFormFormArraysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormFormArraysComponent],
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormFormArraysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
