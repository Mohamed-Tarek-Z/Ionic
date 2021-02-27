import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish/dish.service';
import { FavService } from '../services/fav/fav.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dish: Dish;
  comment: Comment;
  errMess: string;
  avgstars: string;
  numcomments: number;
  fav: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private dishService: DishService,
              private favService: FavService,
              @Inject('BaseURL') public BaseURL:string,
              @Inject('ext') public ext:string) {}

  ngOnInit() {
    this.dishService.getDish(this.activatedRoute.snapshot.params["id"])
    .subscribe((dish) =>  {
      this.dish = dish;
      this.fav = this.favService.isFav(this.dish.id);
      this.numcomments = this.dish?.comments?.length;
      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total/this.numcomments).toFixed(2);
    }, errmess => this.errMess = <any>errmess);
  }

  addTofav(id:string) {
    this.fav = this.favService.addFav(id);
  }
}
