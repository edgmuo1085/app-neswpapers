import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, ArticulosPorCategoriaPag, NewsResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  apiKey = environment.apiKey;
  hostname = environment.urlApi;

  articulosPorCategoriaPag: ArticulosPorCategoriaPag = {};

  constructor(private http: HttpClient) {}

  private ejecutarQuery<T>(endPoint: string) {
    const url = `${this.hostname}${endPoint}`;
    return this.http.get<T>(url, {
      params: {
        apiKey: this.apiKey,
        country: 'us',
      },
    });
  }

  getTopHeadlines(): Observable<Article[]> {
    return this.getArticulosPorCategorias('business');
  }

  getTopHeadlinesByCategory(category: string, cargarMas: boolean = false): Observable<Article[]> {
    if (cargarMas) {
      return this.getArticulosPorCategorias(category);
    }

    if (this.articulosPorCategoriaPag[category]) {
      return of(this.articulosPorCategoriaPag[category].articulos);
    }

    return this.getArticulosPorCategorias(category);
  }

  getArticulosPorCategorias(categoria: string): Observable<Article[]> {
    if (!Object.keys(this.articulosPorCategoriaPag).includes(categoria)) {
      this.articulosPorCategoriaPag[categoria] = {
        page: 0,
        articulos: [],
      };
    }

    const page = this.articulosPorCategoriaPag[categoria].page + 1;
    const url = `top-headlines?category=${categoria}&page=${page}`;
    return this.ejecutarQuery<NewsResponse>(url).pipe(
      map(({ articles }) => {
        if (!articles.length) {
          return this.articulosPorCategoriaPag[categoria].articulos;
        }

        this.articulosPorCategoriaPag[categoria] = {
          page: page,
          articulos: [...this.articulosPorCategoriaPag[categoria].articulos, ...articles],
        };

        return this.articulosPorCategoriaPag[categoria].articulos;
      })
    );
  }
}
