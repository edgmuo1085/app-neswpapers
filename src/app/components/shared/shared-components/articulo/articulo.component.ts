import { Component, Input } from '@angular/core';
import { Article } from 'src/app/components/interfaces';
import { Browser } from '@capacitor/browser';
import { ActionSheetController } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent {
  @Input() articulo: Article = {} as Article;
  @Input() i: number = 0;

  constructor(private actionSheetCtr: ActionSheetController) {}

  async urlRedirect() {
    await Browser.open({ url: this.articulo.url });
  }

  async openMenu() {
    const actionSheet = await this.actionSheetCtr.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => {
            this.getCompartirArticulos();
          },
        },
        {
          text: 'Favorito',
          icon: 'heart-outline',
          handler: () => {
            this.getToggleFavoritos();
          },
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async getCompartirArticulos() {
    await Share.share({
      title: this.articulo.title,
      text: this.articulo.source.name,
      url: this.articulo.url,
      dialogTitle: 'Compartir con redes sociales',
    });
  }

  getToggleFavoritos() {
    console.log('gettoggleFavoritos');
  }
}
