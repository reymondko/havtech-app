import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'My Events',
      url: '/myevents',
    },
    {
      title: 'Special Events',
      url: '/special',
    },
    {
      title: 'General Events',
      url: '/general',
    },
    {
      title: 'Learning Institute',
      url: '/learning',
    },
    /*{
      title: 'View All Upcoming Events',
      url: '/upcoming',
    },*/
    {
      title: 'Profile',
      url: '/profile',
    }
  ];

  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public authService: AuthService,
    public router: Router,
    public alertService: AlertService,
    public loader: LoadingController,
    public notification_service: NotificationService
  ) {
    if (!this.platform.is('mobileweb')) {
      this.splashScreen.show();
    }
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      if (!this.platform.is('mobileweb')) {
        this.notification_service.initializeOnesignal();
      }
      this.getNotifications();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.loader.create({
      message: 'Logging Out.'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.authService.logout().subscribe(
      data => {
        this.loader.dismiss();
        this.alertService.presentToast("Logged Out");
      },
      error => {
        console.log(error);
      },
      () => {
        this.router.navigate(['/login']);
      }
    );
  }

  getNotifications(){
    this.notification_service.checkNotifications().subscribe(
      data => {
        console.log(this.notification_service.onesignal_player_id);
        console.log(this.notification_service.notifications.unread.length);
      },
      error => {
        console.log(error);
      },
      () => {}
    );
  }
}
