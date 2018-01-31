import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';

import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { DishProvider } from '../../providers/dish/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../../pages/comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation. 
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

    dish: Dish;
    errMess: string;
    avgstars: string;
    numcomments: number;
    favorite: boolean ;
    
    
  constructor(public navCtrl: NavController, public navParams: NavParams,
              @Inject('BaseURL') private BaseURL, private favoriteservice: FavoriteProvider, private toastCtrl: ToastController, private actionCtrl: ActionSheetController, public modalCtrl: ModalController, private socialSharing: SocialSharing ) {
      this.dish = navParams.get('dish');
      this.numcomments = this.dish.comments.length;
      this.favorite = favoriteservice.isFavorite(this.dish.id);
      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
    
    addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
        this.toastCtrl.create({
            message: 'Dish ' + this.dish.id + ' added successfully.',
            duration: 3000,
            position: 'middle'
        }).present();
    }

    openComment(){
        let modal = this.modalCtrl.create(CommentPage);
        modal.onDidDismiss(data => {
            console.log('Hey');
            console.log(data);
            if(data)
                this.dish.comments.push(data);
        });
        
        modal.present();
    }

    actionSheet(){
        console.log("yes");
        let action = this.actionCtrl.create({
            title: 'Choose Action',
            buttons: [
                {
                    text: 'Add to Favorites',
                    handler: () => {
                        console.log('Adding to Favorites', this.dish.id);
                        this.favorite = this.favoriteservice.addFavorite(this.dish.id);
                            this.toastCtrl.create({
                                message: 'Dish ' + this.dish.id + ' added successfully.',
                                duration: 3000,
                                position: 'middle'
                            }).present();
                    }

                },
                {
                    text: 'Add Comments',
                    handler: () => {
                        //let navTransition = this.actionSheet.dismiss();
                        ///navTransition.then(() => {
                            this.openComment();
                        //});
                    }
                },
                {
                    text: 'Share via Facebook',
                    handler: () => {
                        this.socialSharing.shareViaFacebook(
                            this.dish.name + ' -- '+ this.dish.description,
                            this.BaseURL + this.dish.image, ''
                          ).then(() => console.log('Posted successfully'))
                            .catch(() => console.log('Failed ton post'));
                    }
                },
                {
                    text: 'Share via Twitter',
                    handler: () => {
                        this.socialSharing.shareViaTwitter(
                            this.dish.name + ' -- '+ this.dish.description,
                            this.BaseURL + this.dish.image, ''
                          ).then(() => console.log('Posted successfully'))
                            .catch(() => console.log('Failed ton post'));
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Action Cancelled');
                    }
                }
            ]
        });
        action.present();
    }

}
