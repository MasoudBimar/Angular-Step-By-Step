import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateVersion2Component } from './rate-version2.component';

describe('RateComponent', () => {
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
});
