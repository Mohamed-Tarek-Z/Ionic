import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  errMess: string;

  constructor(private activatedRoute: ActivatedRoute, 
              private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService,
              @Inject('BaseURL') public BaseURL:string,
              @Inject('ext') public ext:string) { }
  tit: string;
  async ngOnInit() {
    this.tit = this.activatedRoute.snapshot.paramMap.get('id');
    this.dishService.getFeaturedDish().subscribe((dish) => this.dish = dish, errmess => this.errMess = errmess);
    this.promotionService.getFeaturedPromotion().subscribe((promotion) => this.promotion = promotion, errmess => this.errMess = errmess);
    this.leaderService.getFeaturedLeader().subscribe((leader) => this.leader = leader, errmess => this.errMess = errmess);
  }
}
