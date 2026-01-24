import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateVersion3Component } from './rate-version3.component';

describe('RatingComponent', () => {
  let component: RateVersion3Component;
  let fixture: ComponentFixture<RateVersion3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateVersion3Component],
      
    })
      .compileComponents();

    fixture = TestBed.createComponent(RateVersion3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
