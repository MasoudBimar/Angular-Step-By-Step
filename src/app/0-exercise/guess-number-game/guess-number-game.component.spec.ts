import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessNumberGameComponent } from './guess-number-game.component';

describe('GuessNumberGameComponent', () => {
  let component: GuessNumberGameComponent;
  let fixture: ComponentFixture<GuessNumberGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessNumberGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessNumberGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
