import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

    commentGroup: FormGroup;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
              private formBuilder: FormBuilder) {
          this.commentGroup = this.formBuilder.group({
              author: ['',Validators.required],
              comment: ['',Validators.required],
              rating: 5,
              date: Date(),
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
    
    dismiss(){
        
        console.log(this.commentGroup.value);
        this.viewCtrl.dismiss();
    }
    
    onSubmit(){
        console.log(this.commentGroup.value);
        this.viewCtrl.dismiss(this.commentGroup.value);
    }

}
