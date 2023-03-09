import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from '../../interfaces';
import { NewsApiService } from '../../services/news-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  articulos: Article[] = [];
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll!: IonInfiniteScroll;

  constructor(private newsService: NewsApiService) {}

  ngOnInit(): void {
    this.newsService.getTopHeadlines().subscribe({
      next: response => {
        this.articulos = response;
      },
    });
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory('business', true).subscribe({
      next: response => {
        if (response.length === this.articulos.length) {
          this.infiniteScroll.disabled = true;
        }

        this.articulos = response;
        this.infiniteScroll.complete();
      },
    });
  }
}
