import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:any;
  constructor(
    public authService: AuthService,
    public router: Router,
    public alertService: AlertService,
    public loader: LoadingController,
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.loader.create({
      message: 'Logging in'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });

    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.getCurrentUser();
      },
      error => {
        this.loader.dismiss();
        this.alertService.presentToast(error.error.message);
      },
      () => {}
    );
  }

  getCurrentUser(){
    this.userService.getUserDataFromApi().subscribe(
      data => {
        this.user = this.userService.user;
        this.loader.dismiss();
        if(this.user.temporary_pw_status == 1){
          this.router.navigate(['/first-login']);
        }else{
          this.alertService.presentToast('Logged In');
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.loader.dismiss();
        this.authService.clearTokenAndLogOut();
        this.alertService.presentToast("Logged Out");
      },
      () => {}
    );
  }

}
