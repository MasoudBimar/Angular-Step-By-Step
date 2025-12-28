import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehavioralDirectivesComponent } from './behavioral-directives.component';

describe('BehavioralDirectivesComponent', () => {
  let component: BehavioralDirectivesComponent;
  let fixture: ComponentFixture<BehavioralDirectivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BehavioralDirectivesComponent]
    });
    fixture = TestBed.createComponent(BehavioralDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
