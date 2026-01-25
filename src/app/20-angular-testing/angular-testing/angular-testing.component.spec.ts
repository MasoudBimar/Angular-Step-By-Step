import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AngularTestingComponent } from './angular-testing.component';
import { AngularTestingService } from './angular-testing.service';

describe('AngularTestingComponent (basics)', () => {
  let component: AngularTestingComponent;
  let fixture: ComponentFixture<AngularTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularTestingComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AngularTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders default inputs and idle status', () => {
    const title = fixture.debugElement.query(By.css('[data-testid="title"]')).nativeElement as HTMLElement;
    const status = fixture.debugElement.query(By.css('[data-testid="status"]')).nativeElement as HTMLElement;
    const items = fixture.debugElement.queryAll(By.css('[data-testid="items"] li'));

    expect(title.textContent).toContain('Angular Testing Playground');
    expect(status.textContent).toContain('Idle');
    expect(items.length).toBe(2);
  });

  it('renders the title from @Input', () => {
    fixture.componentRef.setInput('title', 'Custom Title');
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('[data-testid="title"]')).nativeElement as HTMLElement;
    expect(title.textContent).toContain('Custom Title');
  });

  it('increments count and updates status text', () => {
    const increment = fixture.debugElement.query(By.css('[data-testid="increment"]'));
    increment.triggerEventHandler('click', null);
    fixture.detectChanges();

    const count = fixture.debugElement.query(By.css('[data-testid="count"]')).nativeElement as HTMLElement;
    const status = fixture.debugElement.query(By.css('[data-testid="status"]')).nativeElement as HTMLElement;
    expect(count.textContent).toContain('1');
    expect(status.textContent).toContain('Active');
  });

  it('toggles details in the DOM', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="details"]'))).toBeNull();

    fixture.debugElement.query(By.css('[data-testid="toggle"]')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="details"]'))).not.toBeNull();
  });

  it('emits output and updates lastSaved', () => {
    component.count = 2;
    fixture.detectChanges();

    const emitSpy = spyOn(component.saved, 'emit');
    fixture.debugElement.query(By.css('[data-testid="save"]')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith('Saved 2');

    const lastSaved = fixture.debugElement.query(By.css('[data-testid="last-saved"]')).nativeElement as HTMLElement;
    expect(lastSaved.textContent).toContain('Saved 2');
  });

  it('validates input in addItem', () => {
    component.addItem('  ');
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('[data-testid="error"]')).nativeElement as HTMLElement;
    expect(error.textContent).toContain('Name required');

    component.addItem('  Cherries  ');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="error"]'))).toBeNull();

    const items = fixture.debugElement.queryAll(By.css('[data-testid="items"] li'));
    expect(items.length).toBe(3);
    expect(items[2].nativeElement.textContent).toContain('Cherries');
  });

  it('can spy on a dependency method', () => {
    const service = TestBed.inject(AngularTestingService);
    const spy = spyOn(service, 'getUsers').and.returnValue(of([{ id: 1, name: 'Spy User' }]));

    component.loadUsers();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    const users = fixture.debugElement.queryAll(By.css('[data-testid="users"] li'));
    expect(users[0].nativeElement.textContent).toContain('Spy User');
  });

  it('trackByName returns the item value', () => {
    expect(component.trackByName(0, 'Apples')).toBe('Apples');
  });
});

describe('AngularTestingComponent (HTTP integration)', () => {
  let component: AngularTestingComponent;
  let fixture: ComponentFixture<AngularTestingComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularTestingComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AngularTestingComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads users from the API', () => {
    component.errorMessage = 'Old error';
    component.loadUsers();

    const request = httpMock.expectOne('/api/users');
    expect(request.request.method).toBe('GET');

    request.flush([{ id: 7, name: 'Ada' }]);
    fixture.detectChanges();

    expect(component.errorMessage).toBe('');
    const users = fixture.debugElement.queryAll(By.css('[data-testid="users"] li'));
    expect(users.length).toBe(1);
    expect(users[0].nativeElement.textContent).toContain('Ada');
  });

  it('shows an error when the API fails', () => {
    component.loadUsers();

    const request = httpMock.expectOne('/api/users');
    request.flush('Boom', { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('[data-testid="error"]')).nativeElement as HTMLElement;
    expect(error.textContent).toContain('Failed to load users');
  });
});

describe('AngularTestingComponent (mock class with useClass)', () => {
  class MockAngularTestingService {
    getUsers() {
      return of([{ id: 10, name: 'Mocked User' }]);
    }
  }

  let component: AngularTestingComponent;
  let fixture: ComponentFixture<AngularTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularTestingComponent],
      providers: [{ provide: AngularTestingService, useClass: MockAngularTestingService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AngularTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('uses the mock service', () => {
    component.loadUsers();
    fixture.detectChanges();

    const users = fixture.debugElement.queryAll(By.css('[data-testid="users"] li'));
    expect(users.length).toBe(1);
    expect(users[0].nativeElement.textContent).toContain('Mocked User');
  });
});
