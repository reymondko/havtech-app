import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  modal_is_active: Boolean;
  constructor(
    public router: Router,
    public authService: AuthService,
    public alertService: AlertService,
    public loader: LoadingController
  ) {
    this.modal_is_active = false;
  }

  ngOnInit() {
  }

  closeModal(){
    this.modal_is_active = false;
  }

  sendForgotPassword(form: NgForm) {
    this.loader.create({
      message: 'Sending'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.authService.forgotPassword(form.value.email).subscribe(
      data => {
        this.loader.dismiss();
        // this.alertService.presentToast('Logged In');
        this.modal_is_active = true;
      },
      error => {
        this.loader.dismiss();
        this.alertService.presentToast(error.error.message);
      },
      () => {
        
      }
    );
  }
}
