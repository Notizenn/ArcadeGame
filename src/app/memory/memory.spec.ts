import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryComponent } from './memory';
import 'zone.js/testing';


describe('Memory', () => {
  let component: MemoryComponent;
  let fixture: ComponentFixture<MemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('winnerText should be empty when no win', () => {
    component.win = false;
    component.scores = { 1: 3, 2: 1 };
    expect(component.winnerText).toBe('');
  });

  it('winnerText should say Player 1 won when score1 > score2', () => {
    component.win = true;
    component.players = { 1: 'Alice', 2: 'Bob' };
    component.scores = { 1: 3, 2: 1 };

    expect(component.winnerText).toBe('Alice won !');
  });

  it('winnerText should say Draw ! when scores are equal', () => {
    component.win = true;
    component.players = { 1: 'Alice', 2: 'Bob' };
    component.scores = { 1: 2, 2: 2 };

    expect(component.winnerText).toBe('Draw !');
  });
});
