import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blagues',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './blagues.html',
  styleUrls: ['./blagues.css']
})
export class BlaguesComponent {

  categories = signal<string[]>([]);
  selectedCategory = signal<string>('');
  joke = signal<string>('');

  constructor(private http: HttpClient) {
    this.loadCategories();
  }

  // Charger la liste des catégories
  loadCategories() {
    this.http.get<string[]>('https://api.chucknorris.io/jokes/categories')
      .subscribe({
        next: (res) => this.categories.set(res),
        error: () => this.categories.set([])
      });
  }

  // Charger une blague
  showJoke() {
    const cat = this.selectedCategory();
    if (!cat) return;

    this.http.get<any>(`https://api.chucknorris.io/jokes/random?category=${cat}`)
      .subscribe({
        next: (res) => this.joke.set(res.value),
        error: () => this.joke.set("Erreur lors du chargement de la blague.")
      });
  }
}
