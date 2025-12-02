import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabyrintheComponent } from './labyrinthe';

describe('Labyrinthe', () => {
  let component: LabyrintheComponent;
  let fixture: ComponentFixture<LabyrintheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabyrintheComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LabyrintheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
