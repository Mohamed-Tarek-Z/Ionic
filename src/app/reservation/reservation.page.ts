import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  reserve: FormGroup;

  constructor(private fb: FormBuilder, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.reserve = this.fb.group({
      guests: 3,
      smoking: false,
      dateTime: ['', Validators.required]
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  onSubmit(): void {
    this.dismiss();
  }


}
