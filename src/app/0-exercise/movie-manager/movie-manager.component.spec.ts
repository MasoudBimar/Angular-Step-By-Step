import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieManagerComponent } from './movie-manager.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MovieManagerComponent', () => {
  let component: MovieManagerComponent;
  let fixture: ComponentFixture<MovieManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MovieManagerComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]

    });
    fixture = TestBed.createComponent(MovieManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
