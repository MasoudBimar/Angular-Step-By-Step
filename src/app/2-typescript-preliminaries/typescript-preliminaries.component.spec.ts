import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptPreliminariesComponent } from './typescript-preliminaries.component';

describe('TypescriptPreliminariesComponent', () => {
  let component: TypescriptPreliminariesComponent;
  let fixture: ComponentFixture<TypescriptPreliminariesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypescriptPreliminariesComponent]
    });
    fixture = TestBed.createComponent(TypescriptPreliminariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
