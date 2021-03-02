import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Menu', url: '/menu', icon: 'list' },
    { title: 'Favorites', url: '/favorites', icon: 'heart' },
    { title: 'About US', url: '/about', icon: 'information-circle' },
    { title: 'Contact US', url: '/contact', icon: 'call' }
  ];
  constructor() {}
}
