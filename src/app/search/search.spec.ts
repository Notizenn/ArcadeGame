import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBlaguesComponent } from './search';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Search', () => {
  let component: SearchBlaguesComponent;
  let fixture: ComponentFixture<SearchBlaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBlaguesComponent,
        HttpClientTestingModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchBlaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
