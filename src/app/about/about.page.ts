import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  leaders: Leader[];
  errMess: string;

  constructor(private leaderService: LeaderService,
              @Inject('BaseURL') public BaseURL:string,
              @Inject('ext') public ext:string) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe((leaders) => this.leaders = leaders, errmess => this.errMess = <any>errmess);
  }

}
