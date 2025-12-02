import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { blagueStore } from './blagues_store';

@Injectable({
    providedIn: 'root',
})
export class BlagueService {
    private readonly baseUrl = 'https://api.chucknorris.io/jokes';

    constructor(private http: HttpClient) { }

    loadCategories(): void {

        blagueStore.update((state) => ({
            ...state,
            loading: true,
            error: null,
        }));

        this.http.get<string[]>(`${this.baseUrl}/categories`).subscribe({
            next: (categories) => {
                blagueStore.update((state) => ({
                    ...state,
                    categories,
                    loading: false,
                }));
            },
            error: () => {
                blagueStore.update((state) => ({
                    ...state,
                    loading: false,
                    error: 'Erreur lors du chargement des catégories',
                }));
            },
        });
    }


    loadRandomByCategory(category: string): void {
        if (!category) return;

        blagueStore.update((state) => ({
            ...state,
            loading: true,
            error: null,
        }));

        this.http
            .get<{ value: string }>(`${this.baseUrl}/random?category=${category}`)
            .subscribe({
                next: (res) => {
                    blagueStore.update((state) => ({
                        ...state,
                        currentJoke: res.value,
                        loading: false,
                    }));
                },
                error: () => {
                    blagueStore.update((state) => ({
                        ...state,
                        loading: false,
                        error: 'Erreur lors du chargement de la blague',
                    }));
                },
            });
    }
}
