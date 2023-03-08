import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(private newsService: NewsApiService) {}

  ngOnInit(): void {
    this.newsService.getTopHeadlines().subscribe({
      next: (response) => {
        console.log(response.articles);
      },
    });
  }
}
