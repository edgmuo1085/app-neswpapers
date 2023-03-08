import { Component, Input } from '@angular/core';
import { Article } from 'src/app/components/interfaces';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent {
  @Input() articulo: Article = {} as Article;
  @Input() i: number = 0;
}
