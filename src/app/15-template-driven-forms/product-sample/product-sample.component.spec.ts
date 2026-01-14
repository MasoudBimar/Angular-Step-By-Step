import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSampleComponent } from './product-sample.component';

describe('ProductSampleComponent', () => {
  let component: ProductSampleComponent;
  let fixture: ComponentFixture<ProductSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSampleComponent],
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
