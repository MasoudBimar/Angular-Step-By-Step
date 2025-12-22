import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecyclesComponent } from './lifecycles.component';

describe('LifecyclesComponent', () => {
  let component: LifecyclesComponent;
  let fixture: ComponentFixture<LifecyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifecyclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifecyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
