import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RateComponent } from "./rate.component"

describe('RateComponents', () => {
  let component: RateComponent;
  let fixture: ComponentFixture<RateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it('should set hovered value to zero', () => {
    expect(component['hoveredValue']).toBe(0);
  });

  it('should create 5 star array by default', () => {
    expect(component['stars']).toEqual([1, 2, 3, 4, 5])
  });

})
