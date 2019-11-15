import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController, NavParams, LoadingController, ToastController, Events, Nav } from 'ionic-angular';
import { HomePage } from '..//home/home';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: FormGroup;
  loading: any;
  formdata = {
    username: '',
    password: '',
    remember: false
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, private toastCtrl: ToastController, private storage: Storage, public events: Events, private http: Http, public nav: Nav) {
    this.login = this.formBuilder.group({
      username: [this.formdata.username, Validators.compose([Validators.maxLength(40), Validators.email, Validators.required])],
      password: [this.formdata.password, Validators.compose([Validators.minLength(6), Validators.required])],
      remember: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  sp_login() {
    console.log(this.login.value)
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    })
    this.loading.present()
    let body = JSON.stringify({
      "email": this.formdata.username,
      "password": this.formdata.password
    })
    let header = new Headers({
      'Content-Type': 'application/json',
      'accept': 'application/json'
    })

    let options = new RequestOptions({ headers: header })
    if (this.formdata.remember == true) {
      this.storage.set("remember", true)
    }
    this.http.post("https://ns100.idgafgroup.com/aceso/public/api/login", body, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        if (data.success == true) {
          this.storage.set("user", data.user)
          this.nav.setRoot(HomePage, { User: data.user })
          this.loading.dismiss()
        }
        else {
          let toast = this.toastCtrl.create({
            message: 'Username or Password is invalid !!',
            duration: 3000,
            position: 'top'
          })
          toast.present();
          this.loading.dismiss()
        }
      })
  }


  register() {
    this.navCtrl.push(RegisterPage)
  }

}
