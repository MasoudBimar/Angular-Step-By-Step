import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterExampleComponent } from './counter-example.component';
import { By } from '@angular/platform-browser';

describe('CounterExampleComponent', () => {
  let component: CounterExampleComponent;
  let fixture: ComponentFixture<CounterExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CounterExampleComponent],

    });
    fixture = TestBed.createComponent(CounterExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should counter be set to zero', () => {
    expect(component['counter']).toBe(0);
  });

  it('should increase the counter value by button click ', () => {
    const debugElement = fixture.debugElement.query(By.css('[data-testid= "inc-button"]'));
    (debugElement.nativeElement as HTMLButtonElement).click();
    expect(component['counter']).toBe(1);
  })

  it('should change the counter value by button click', () => {
    const upDebugElement = fixture.debugElement.query(By.css('[data-testid= "inc-button"]'));
    const downDebugElement = fixture.debugElement.query(By.css('[data-testid= "dec-button"]'));
    (upDebugElement.nativeElement as HTMLButtonElement).click();
    (upDebugElement.nativeElement as HTMLButtonElement).click();
    (downDebugElement.nativeElement as HTMLButtonElement).click();
    expect(component['counter']).toBe(1);
  })

  it('should cahnge the counter value by keydown', () => {
    const upDebugElement = fixture.debugElement.query(By.css('[data-testid= "counter-container"]'));

    upDebugElement.triggerEventHandler('keydown', { key: 'ArrowUp', code: 'ArrowUp' });
    upDebugElement.triggerEventHandler('keydown', { key: 'ArrowUp', code: 'ArrowUp' });
    upDebugElement.triggerEventHandler('keydown', { key: 'ArrowDown', code: 'ArrowDown' });

    expect(component['counter']).toBe(1);
  })
});
