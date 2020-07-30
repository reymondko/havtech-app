import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user:any;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public alertService: AlertService,
    public notificationService: NotificationService,
    public router: Router
  ) {
    if(this.userService.user !== undefined){
      this.user = this.userService.user;
    }
    this.getCurrentUser();
    this.setOnesignalPlayerId();
  }

  getCurrentUser(){
    this.userService.getUserDataFromApi().subscribe(
      data => {
        this.user = this.userService.user;
        if(this.user.temporary_pw_status == 1){
          this.router.navigate(['/first-login']);
        }
      },
      error => {
        this.authService.clearTokenAndLogOut();
        this.alertService.presentToast("Logged Out");
        console.log(error);
      },
      () => {}
    );
  }

  setOnesignalPlayerId(){
    if(this.notificationService.onesignal_player_id != null){
      this.notificationService.setOnesignalPlayerId().subscribe(
          data => {},
          error =>{
            console.log(error);
          },
          () => {}
      );
    }
  }

  refreshData(event){
    this.userService.getUserDataFromApi().subscribe(
      data => {
        this.user = this.userService.user; 
        event.target.complete();
      },
      error => {
        this.authService.clearTokenAndLogOut();
        this.alertService.presentToast("Logged Out");
        event.target.complete();
      },
      () => {
        event.target.complete();
      }
    )
  }
}
