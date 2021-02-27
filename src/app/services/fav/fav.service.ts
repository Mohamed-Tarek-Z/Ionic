import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  favs: Array<any>;

  constructor() { 
    this.favs = [];
  }

  addFav(id:string): boolean {
    this.favs.push(id);
    return true;
  }
  
  isFav(id:string): boolean {
    return this.favs.some(el => el === id);
  }
}
