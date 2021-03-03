import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { DishService } from '../dish/dish.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  favs: Array<any>;

  constructor(private dishService: DishService) { 
    this.favs = [];
  }

  addFav(id:string): boolean {
    if(!this.isFav(id)){
      this.favs.push(id);
    }
    return true;
  }

  rmFav(id:string): Observable<Dish[]> {
    let index = this.favs.indexOf(id);
    if(index >= 0){
      this.favs.splice(index, 1);
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
