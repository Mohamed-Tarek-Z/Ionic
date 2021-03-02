import { Component, OnInit, Inject } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
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

  constructor(private favService: FavService, @Inject('BaseURL') public BaseURL:string, @Inject('ext') public ext:string) { }

  ngOnInit() {
    this.favService.getFavs().subscribe(favs => this.favs = favs, errMess => this.errMess = errMess);
  }

  deletfav(item: IonItemSliding , id:string) {
    console.log('delete',id);
    this.favService.rmFav(id).subscribe(favs => this.favs = favs, errMess => this.errMess = errMess);
    item.close();
  }
}

