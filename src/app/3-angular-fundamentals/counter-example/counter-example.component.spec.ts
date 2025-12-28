import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterExampleComponent } from './counter-example.component';

describe('CounterExampleComponent', () => {
  let component: CounterExampleComponent;
  let fixture: ComponentFixture<CounterExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterExampleComponent]
    });
    fixture = TestBed.createComponent(CounterExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
