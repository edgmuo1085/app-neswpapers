import { Component, Input } from '@angular/core';
import { Article } from 'src/app/components/interfaces';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent {
  @Input() articulo: Article = {} as Article;
  @Input() i: number = 0;

  onClick() {
    console.log('onClick');
  }

  async urlRedirect() {
    await Browser.open({ url: this.articulo.url });
  }
}
