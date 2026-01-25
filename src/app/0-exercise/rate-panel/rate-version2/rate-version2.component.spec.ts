import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateVersion2Component } from './rate-version2.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

fdescribe('RateVersion2Component', () => {
  let component: RateVersion2Component;
  let fixture: ComponentFixture<RateVersion2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateVersion2Component],

    })
      .compileComponents();

    fixture = TestBed.createComponent(RateVersion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 5 array star by default', () => {
    expect(component['states']).toEqual([1, 2, 3, 4, 5]);
  })

  it('should create corresponding array star based on input', () => {
    fixture.componentRef.setInput('stars', 10);
    fixture.detectChanges();
    expect(component['states']).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should emit rateChange Event', () => {
    spyOn(component.rateChange, 'emit');
    component.changeHandler(4);
    expect(component.rateChange.emit).toHaveBeenCalledWith(4);
  });

  it('should display 5 star by default', () => {
    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('[data-testid="star-item"]'));
    expect(debugElements.length).toBe(5);
  });

  it('should display corresponding count of star item based on input', () => {
    fixture.componentRef.setInput('stars', 10);
    fixture.detectChanges();
    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('[data-testid="star-item"]'));
    expect(debugElements.length).toBe(10);
  });

  it('should emit star item value corresponding the star that get clicked', () => {
    fixture.componentRef.setInput('stars', 10);
    spyOn(component.rateChange, 'emit');
    fixture.detectChanges();
    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('[data-testid="star-item"]'));
    (debugElements[3].nativeElement as HTMLSpanElement).click();
    expect(component.rateChange.emit).toHaveBeenCalledWith(4);
  });

});
