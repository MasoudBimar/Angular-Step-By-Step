import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieManagerComponent } from './movie-manager.component';

describe('MovieManagerComponent', () => {
  let component: MovieManagerComponent;
  let fixture: ComponentFixture<MovieManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieManagerComponent]
    });
    fixture = TestBed.createComponent(MovieManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
