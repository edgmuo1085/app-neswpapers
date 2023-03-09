import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from '../../interfaces';
import { NewsApiService } from '../../services/news-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  categorias: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  selectCategoria: string = this.categorias[0];
  articulos: Article[] = [];
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll!: IonInfiniteScroll;

  constructor(private newsService: NewsApiService) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  segmentChanged(event: Event) {
    this.selectCategoria = (event as CustomEvent).detail.value;
    this.getCategorias();
  }

  getCategorias() {
    this.newsService.getTopHeadlinesByCategory(this.selectCategoria).subscribe({
      next: response => {
        this.articulos = [...response];
      },
    });
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory(this.selectCategoria, true).subscribe({
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
