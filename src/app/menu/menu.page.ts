import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish/dish.service';
import { FavService } from '../services/fav/fav.service';
import { IonItemSliding , ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish[];
  errMess: string;
  constructor(private tost: ToastController, private dishService: DishService, private favService: FavService, @Inject('BaseURL') public BaseURL:string, @Inject('ext') public ext:string) { }

  ngOnInit() {
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes, errmess => this.errMess = <any>errmess) ;
  }

  async addTofav(item: IonItemSliding, id:string) {
    let tos = await this.tost.create({
      message: 'Dish ' + id + ' Added To Favs',
      duration: 2000
    });
    this.favService.addFav(id);
    item.close();
    await tos.present();
  }
}
