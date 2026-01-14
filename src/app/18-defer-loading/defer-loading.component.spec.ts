import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferLoadingComponent } from './defer-loading.component';

describe('DeferLoadingComponent', () => {
  let component: DeferLoadingComponent;
  let fixture: ComponentFixture<DeferLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeferLoadingComponent],
      
    });
    fixture = TestBed.createComponent(DeferLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
