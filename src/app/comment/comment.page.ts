import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish/dish.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  commentForm: FormGroup;
  comment: Comment;
  @Input() dish: Dish;
  errMess: string;
  constructor(private dishService: DishService, 
              private fb: FormBuilder, 
              public modalCtrl: ModalController,
              private loading: LoadingController,
              private tost: ToastController) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  async onSubmit() {
    let tos = await this.tost.create({
      message: 'Comment Added To the Selected Dish '+this.dish.id,
      duration: 2000
    });
    let lod = await this.loading.create({
      message: 'Adding . . . . '
    });
    this.comment = this.commentForm?.value;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);
    await lod.present();
    this.dishService.putDish(this.dish).subscribe(dish => {this.dish = dish;lod.dismiss(); tos.present(); this.dismiss();}, errmess => {this.errMess = errmess;lod.dismiss();} );
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
