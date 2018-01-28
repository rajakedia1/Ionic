
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

    favorites: Array<any>;
    
  constructor(public http: Http, private dishservice: DishProvider , private storage: Storage, private localNotification: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');
      this.favorites = [];
      
      storage.get('favorites').then(favorite => {
          if(favorite){
              this.favorites = favorite;
          }else{
              console.log('Favorites not defined');
          }
      });
  }
    
    addFavorite(id: number): boolean {
        if(!this.isFavorite(id)){
            this.favorites.push(id);
            this.storage.set('favorites',this.favorites);
            console.log(this.favorites);
            this.localNotification.schedule({
                id: id,
                text: 'Dish '+id+' is added Successfully!'
            });
        }
        return true;
    }
    
    isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
    }
    
    getFavorites(): Observable<Dish[]>{
        return this.dishservice.getDishes()
        .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
    }
    
    deleteFavorite(id: number): Observable<Dish[]>{
        let index = this.favorites.indexOf(id);
        if(index >= 0) {
            this.favorites.splice(index, 1);
            this.storage.set('favorites',this.favorites);
            console.log(this.favorites);
            return this.getFavorites();
        }else{
            console.log("Deleting non existing item", +id);
            return Observable.throw('Deleting non-existing item'+id);
        }
    }
    
}
