import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  tit: string;
  ngOnInit() {
    this.tit = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
