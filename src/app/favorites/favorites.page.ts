import { Component, OnInit, Inject } from '@angular/core';
import { IonItemSliding, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { FavService } from '../services/fav/fav.service';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favs: Dish[];
  errMess: string;

  constructor(private alert: AlertController, private loading: LoadingController, private tost: ToastController, private favService: FavService, @Inject('BaseURL') public BaseURL:string, @Inject('ext') public ext:string) { }

  ngOnInit() {
    this.favService.getFavs().subscribe(favs => this.favs = favs, errMess => this.errMess = errMess);
  }

  async deletfav(item: IonItemSliding, id:string) {
    let tos = await this.tost.create({
      message: 'Dish ' + id + ' Removed From Favs',
      duration: 2000
    });
    let lod = await this.loading.create({
      message: 'Deleting . . . . '
    });
    let aler = await this.alert.create({
      header: 'Remove!',
      message: 'Remove From Favs ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Yes',
          handler: () => {
            lod.present();
            this.favService.rmFav(id).subscribe(favs => {this.favs = favs; lod.dismiss(); tos.present();}, errMess => {this.errMess = errMess;lod.dismiss();});
          }
        }
      ]
    });
    await aler.present();
    item.close();
  }
}

