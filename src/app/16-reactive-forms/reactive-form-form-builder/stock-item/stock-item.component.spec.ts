import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { StockReactiveItemComponent } from './stock-item.component';
import { By } from '@angular/platform-browser';
import { Stock } from '../model/stock';

describe('Reactive Form Stock Item Component', () => {

  let fixture: ComponentFixture<StockReactiveItemComponent>
  let component: StockReactiveItemComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [StockReactiveItemComponent],

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReactiveItemComponent);
    component = fixture.componentInstance;
    component.stock = new Stock('Testing Stock', 'TS', 100, 200);
    fixture.detectChanges();
  });

  it('should create stock component and render stock data', () => {
    const nameEl = fixture.debugElement.query(By.css('[data-testid="stock-name"]'));
    expect(nameEl.nativeElement.textContent.trim()).withContext('Testing Stock (TS)').not.toBeNull();
    const priceEl = fixture.debugElement.query(By.css('.stock-price.negative'));
    expect(priceEl.nativeElement.textContent.trim()).toEqual('$ 100');
    const addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
    expect(addToFavoriteBtnEl).toBeDefined();
  });

  it('should trigger event emitter on add to favorite', () => {
    let selectedStock: Stock | undefined;
    component.toggleFavorite.subscribe((stock: Stock) => selectedStock = stock);
    const addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));

    expect(selectedStock).toBeUndefined();
    addToFavoriteBtnEl.triggerEventHandler('click', null);
    expect(selectedStock).toEqual(component.stock);
  });
});
