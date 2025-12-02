import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blagues } from './blagues';

describe('Blagues', () => {
  let component: Blagues;
  let fixture: ComponentFixture<Blagues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blagues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blagues);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
