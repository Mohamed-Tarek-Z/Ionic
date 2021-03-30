import { Component, Inject } from '@angular/core';
import { Platform, ModalController, LoadingController } from '@ionic/angular';
import { ReservationPage } from './reservation/reservation.page';
import { LoginPage } from './login/login.page';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  loading: any = null;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Menu', url: '/menu', icon: 'list' },
    { title: 'Favorites', url: '/favorites', icon: 'heart' },
    { title: 'About US', url: '/about', icon: 'information-circle' },
    { title: 'Contact US', url: '/contact', icon: 'call' }
  ];
  constructor(private platform: Platform, private network: Network, private modalCtrl: ModalController, private loadingCtrl: LoadingController, @Inject('BaseURL') public BaseURL:string) {
    this.platform.ready().then(() => {
      this.network.onDisconnect().subscribe(() => {
        if (!this.loading) {
          this.loading = this.loading.create({
            message: 'Adding . . . . '
          });
          this.loading.present();
        }
      });

      this.network.onConnect().subscribe(() => {
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            console.log('we got a wifi connection, woohoo!');
          }
        }, 3000);
        if (this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
      });
    });
  }

  async presentReserve() {
    const modal = await this.modalCtrl.create({
      component: ReservationPage,
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }

  async presentLogin() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }
}
