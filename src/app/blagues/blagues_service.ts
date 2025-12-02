import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { blagueStore } from './blagues_store';

@Injectable({
    providedIn: 'root',
})
export class BlagueService {
    private readonly baseUrl = 'https://api.chucknorris.io/jokes';

    constructor(private http: HttpClient) { }

    /** Charge la liste des catégories et les place dans le store */
    loadCategories(): void {
        // on passe en état "loading"
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

    /** Récupère une blague aléatoire pour une catégorie donnée et la stocke */
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
