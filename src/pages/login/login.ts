import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../shared/user';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    
    loginForm: FormGroup;
    user: User = {username: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, private formBuilder: FormBuilder, private storage: Storage) {
      
      storage.get('user').then(user => {
          if(user){
              this.user = user;
              this.loginForm.patchValue({
                  'username': this.user.username,
                  'password': this.user.password
              });
          }else{
              console.log('User not defined');
          }
      });
      
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          remember: true
      });
      
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
    
    dismiss(){
        this.viewCtrl.dismiss();
    }
    onSubmit(){
        this.user.username = this.loginForm.get('username').value;
        this.user.password = this.loginForm.get('password').value;
        
        if(this.loginForm.get('remember').value){
            this.storage.set('user', this.user);
        }else{
            this.storage.remove('user');
        }
        this.viewCtrl.dismiss();
    }

}
