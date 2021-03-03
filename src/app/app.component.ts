import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReservationPage } from './reservation/reservation.page';

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
  constructor(private modalCtrl: ModalController) {}

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ReservationPage,
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }
}
