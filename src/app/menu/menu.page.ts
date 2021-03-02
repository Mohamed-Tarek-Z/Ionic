import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish/dish.service';
import { FavService } from '../services/fav/fav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish[];
  errMess: string;
  constructor(private dishService: DishService, private favService: FavService, @Inject('BaseURL') public BaseURL:string, @Inject('ext') public ext:string) { }

  ngOnInit() {
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes, errmess => this.errMess = <any>errmess) ;
  }

  addTofav(id:string) {
    this.favService.addFav(id);
  }
}
