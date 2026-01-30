import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerComponent } from './color-picker.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ColorPickerComponent],

    });
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the background color with calling colorChange', () => {
    spyOn(component, 'colorChange').and.callThrough();
    const debugElement: DebugElement = fixture.debugElement.query(By.css(`[data-testid="input-color-picker"]`));
    const inputElement = debugElement.nativeElement as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '#ff0000';
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();
    }
    expect(component.colorChange).toHaveBeenCalled();
    fixture.detectChanges();
    const color = getComputedStyle(fixture.debugElement.nativeElement).backgroundColor;
    expect(color).toBe('rgb(255, 0, 0)');
  })
});
