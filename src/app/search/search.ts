import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlagueService } from '../blagues/blagues_service';
import { blagueStore, BlagueState } from '../blagues/blagues_store';

import { select } from '@ngneat/elf';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-blagues',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
})
export class SearchBlaguesComponent {
  selectedCategory = signal('');

  categories = toSignal(
    blagueStore.pipe(select((state: BlagueState) => state.categories)),
    { initialValue: [] as string[] }
  );

  joke = toSignal(
    blagueStore.pipe(select((state: BlagueState) => state.currentJoke)),
    { initialValue: '' }
  );

  constructor(private blagueService: BlagueService) { }

  ngOnInit() {
    this.blagueService.loadCategories();
  }

  showJoke() {
    const cat = this.selectedCategory();
    console.log('showJoke avec catégorie :', cat);
    if (!cat) {
      return;
    }
    this.blagueService.loadRandomByCategory(cat);
  }
}
