import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalTodoAppComponent } from './signal-todo-app.component';

describe('SignalTodoAppComponent', () => {
  let component: SignalTodoAppComponent;
  let fixture: ComponentFixture<SignalTodoAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalTodoAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalTodoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
