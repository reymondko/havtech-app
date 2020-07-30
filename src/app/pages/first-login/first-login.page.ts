import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.page.html',
  styleUrls: ['./first-login.page.scss'],
})
export class FirstLoginPage implements OnInit {

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public alertService: AlertService,
    public loader: LoadingController
  ) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.loader.create({
      message: 'Creating Account'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.authService.loginFirstTime(form.value.email, form.value.password,form.value.password_new).subscribe(
      data => {
        this.loader.dismiss();
        this.alertService.presentToast('Logged In');
      },
      error => {
        this.loader.dismiss();
        this.alertService.presentToast(error.error.message);
      },
      () => {
        this.navCtrl.navigateRoot('/home');
      }
    );
  }

}
