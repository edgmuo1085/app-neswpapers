import { Component, OnInit } from '@angular/core';
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

  constructor(private newsApiService: NewsApiService) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  segmentChanged(event: any) {
    console.log(event.detail.value);
    this.selectCategoria = event.detail.value;
    this.getCategorias();
  }

  getCategorias() {
    this.newsApiService.getTopHeadlinesByCategory(this.selectCategoria).subscribe({
      next: response => {
        this.articulos = [...response];
      },
    });
  }
}
