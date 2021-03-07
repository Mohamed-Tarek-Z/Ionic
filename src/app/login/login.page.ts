import { Component, OnInit } from '@angular/core';
import { ModalController,  } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  LogForm: FormGroup;
  user: User = {username:'', password:''};

  constructor(private fb: FormBuilder, public modalCtrl: ModalController, private storage: Storage) { }

  ngOnInit() {
    this.LogForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
    this.storage.get('user').then(async user=> {
      if(user){
        this.user = user;
        this.LogForm.patchValue({
          'username': this.user.username,
          'password': this.user.password
        });
      }
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  onSubmit(): void {
    this.user.username = this.LogForm.get('username').value;
    this.user.password = this.LogForm.get('password').value;
    if(this.LogForm.get('remember').value)
      this.storage.set('user',this.user);
    else 
      this.storage.remove('user');
    
    this.dismiss();
  }

}
