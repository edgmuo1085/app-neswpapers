import { Component, Input } from '@angular/core';
import { Article } from 'src/app/components/interfaces';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
})
export class ArticulosComponent {
  @Input() articulos: Article[] = [];
}