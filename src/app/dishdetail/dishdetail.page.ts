import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish/dish.service';
import { FavService } from '../services/fav/fav.service';
import { ToastController, LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import { CommentPage } from '../comment/comment.page';


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
              private loading: LoadingController,
              private action: ActionSheetController,
              private tost: ToastController,
              private modalCtrl: ModalController,
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

  async addTofav() {
    let tos = await this.tost.create({
      message: 'Dish ' + this.dish.id + ' Added To Favs',
      position: 'middle',
      duration: 2000
    });
    this.fav = this.favService.addFav(this.dish.id);
    await tos.present();
  }

  async deletfav() {
    let tos = await this.tost.create({
      message: 'Dish ' + this.dish.id + ' Removed From Favs',
      position: 'middle',
      duration: 2000
    });
    let lod = await this.loading.create({
      message: 'Deleting . . . . '
    });
    await lod.present();
    this.favService.rmFav(this.dish.id).subscribe(favs => {this.fav = this.favService.isFav(this.dish.id); lod.dismiss(); tos.present();}, errMess => {this.errMess = errMess;lod.dismiss();});
  }
  
  async MoreClick() {
    let acti =  await this.action.create({
      header: 'Select action',
      buttons: [{
        text: 'Add To Favorite',
        icon: 'heart',
        handler: () => {
          this.addTofav();
        }
      },{
        text: 'Remove From Favorite',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deletfav();
        }
      }, {
        text: 'Add Comment',
        icon: 'pricetags',
        handler: async () => {
          (await this.modalCtrl.create({
            component: CommentPage,
            swipeToClose: true,
            componentProps: {'dish': this.dish},
            presentingElement: await this.modalCtrl.getTop()
          })).present();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await acti.present();
  }
}
