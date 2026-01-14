import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialElementsComponent } from './special-elements.component';

describe('SpecialElementsComponent', () => {
  let component: SpecialElementsComponent;
  let fixture: ComponentFixture<SpecialElementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpecialElementsComponent],
      
    });
    fixture = TestBed.createComponent(SpecialElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
