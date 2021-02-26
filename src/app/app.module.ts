import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

import { DishService } from './services/dish/dish.service';
import { PromotionService } from './services/promotion/promotion.service';
import { LeaderService } from './services/leader/leader.service';
import { ProcessHttpmsgService } from './services/http/process-httpmsg.service';
import { BaseURL, ext } from './shared/baseurl';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DishService,
    PromotionService,
    LeaderService,
    ProcessHttpmsgService,
    { provide: 'BaseURL', useValue: BaseURL },
    { provide: 'ext', useValue: ext }],
  bootstrap: [AppComponent],
})
export class AppModule {}
