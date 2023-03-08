import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces';
import { NewsApiService } from '../../services/news-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  articulos: Article[] = [];

  constructor(private newsService: NewsApiService) {}

  ngOnInit(): void {
    this.newsService.getTopHeadlines().subscribe({
      next: (response) => {
        console.log(response);
        this.articulos = response;
      },
    });
  }
}
