import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDataHandlingEventComponent } from './display-data-handling-event.component';

describe('DisplayDataHandlingEventComponent', () => {
  let component: DisplayDataHandlingEventComponent;
  let fixture: ComponentFixture<DisplayDataHandlingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDataHandlingEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDataHandlingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
