import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  constructor(private http: HttpClient) {}

  getTopHeadlines(): Observable<Article[]> {
    const url =
      'https://newsapi.org/v2/top-headlines?country=us&category=business';

    return this.http
      .get<NewsResponse>(url, {
        headers: this.getHeadersCustom(),
      })
      .pipe(map(({ articles }) => articles));
  }

  getHeadersCustom(): HttpHeaders {
    const head = {
      Authorization: apiKey,
    };

    return new HttpHeaders({ ...head });
  }
}
