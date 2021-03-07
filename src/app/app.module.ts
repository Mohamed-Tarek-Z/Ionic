import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage'; 

import { HttpClientModule } from '@angular/common/http';
import { BaseURL, ext } from './shared/baseurl';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule, IonicStorageModule.forRoot()],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: 'BaseURL', useValue: BaseURL },
    { provide: 'ext', useValue: ext }],
  bootstrap: [AppComponent],
})
export class AppModule {}
