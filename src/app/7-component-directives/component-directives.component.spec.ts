import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDirectivesComponent } from './component-directives.component';

describe('ComponentDirectivesComponent', () => {
  let component: ComponentDirectivesComponent;
  let fixture: ComponentFixture<ComponentDirectivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentDirectivesComponent]
    });
    fixture = TestBed.createComponent(ComponentDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
