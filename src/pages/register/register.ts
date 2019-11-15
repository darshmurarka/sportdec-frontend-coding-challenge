import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { matchOtherValidator } from '../check-match';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  register: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public FormBuilder: FormBuilder, private http: Http, public RequestOptions: RequestOptions, public toastCtrl: ToastController) {
    this.register = this.FormBuilder.group({
      f_name: ['', Validators.compose([Validators.pattern('[A-Za-z]*'), Validators.minLength(3), Validators.required])],
      l_name: ['', Validators.compose([Validators.pattern('[A-Za-z]*'), Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.email])],
      dob: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirm_password: ['', Validators.compose([Validators.minLength(6), Validators.required, matchOtherValidator('password')])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  regFormp() {
    let header = new Headers({
      'Content-Type': 'application/json',
      'accept': 'application/json',
    })

    let options = new RequestOptions({ headers: header });
    var val = this.register.value;
    var body = JSON.stringify({
      fname: val.f_name,
      lname: val.l_name,
      phone: "0899577228",
      address: "This is temporary",
      gender: val.gender,
      dob: val.dob,
      email: val.email,
      password: val.password,
      role: 1
    })
    console.log(body)
    this.http.post("https://ns100.idgafgroup.com/aceso/public/api/register", body, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data)
        if (data.success == true) {
          let toast = this.toastCtrl.create({
            message: 'Registration Successful',
            duration: 3000,
            position: 'top'
          });

          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
            this.navCtrl.push(LoginPage)
          });

          toast.present();
        }
        else {
          let toast = this.toastCtrl.create({
            message: 'Registration Failed',
            duration: 3000,
            position: 'top'
          });

          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });

          toast.present();
        }

      });
  }

}
