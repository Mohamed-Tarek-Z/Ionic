import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { DishService } from '../dish/dish.service';
import { Observable, throwError } from 'rxjs';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  favs: Array<any>;

  constructor(private dishService: DishService, private storage: Storage) { 
    this.storage.get('favs').then(async favs=> {
      if(favs){
        this.favs = favs;
      }else
      this.favs =[];
    });
  }

  addFav(id:string): boolean {
    if(!this.isFav(id)){
      this.favs.push(id);
      this.storage.set('favs',this.favs);
    }
    return true;
  }

  rmFav(id:string): Observable<Dish[]> {
    let index = this.favs.indexOf(id);
    if(index >= 0){
      this.favs.splice(index, 1);
      this.storage.set('favs',this.favs);
      return this.getFavs();
    }else {
      return throwError('a7a btms7 ah !');
    }
  }
  
  isFav(id:string): boolean {
    return this.favs.some(el => el === id);
  }

  getFavs():Observable<Dish[]> {
    return this.dishService.getDishes().pipe(map( dishes => dishes.filter(dish => this.favs.some(el => el === dish.id))));
  }
}
