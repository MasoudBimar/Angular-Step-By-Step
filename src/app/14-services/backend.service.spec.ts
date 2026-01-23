import { TestBed } from '@angular/core/testing';
import { RestApiService } from './backend.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


xdescribe('RestApiService', () => {
  let service: RestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RestApiService
      ],
      providers: [
        provideHttpClient(),        // Provides the real HttpClient
        provideHttpClientTesting(), // Overrides it with a mock backend
      ]
    });

  })

  it('should be created', () => {
    service = TestBed.inject(RestApiService);
    expect(service).toBeTruthy();
  });
})
