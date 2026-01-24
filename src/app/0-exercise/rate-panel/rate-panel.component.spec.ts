import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatePanelComponent } from './rate-panel.component';

describe('RatePanelComponent', () => {
  let component: RatePanelComponent;
  let fixture: ComponentFixture<RatePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
