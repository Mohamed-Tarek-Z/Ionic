import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private emailComposer: EmailComposer, private callNumber: CallNumber) { }

  ngOnInit() {
  }

  sendEmail() {
    let email = {
      to: 'confusion@food.net',
      subject: '[ConFusion] Query',
      body: 'Dear Sir/Madam:',
      isHtml: true
    };

    this.emailComposer.open(email);
  }
  
  callRestaurant() {
    this.callNumber.callNumber("01150979574", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

}
