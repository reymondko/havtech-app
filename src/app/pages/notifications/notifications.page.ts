import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(
    public notifications_service:NotificationService,
    public browser: InAppBrowser
  ) { 
  }

  ngOnInit(
    
  ) {
    this.updateNotifications();
  }

  updateNotifications(){
    this.notifications_service.getNotifications().subscribe(
      data => {},
      error => {
        console.log(error)
      },
      () => {}
    );
  }

  markNotification(id){
    this.notifications_service.markNotifications(id).subscribe(
      data => {},
      error => {
        console.log(error)
      },
      () => {}
    );
  }

  refreshData(event){
    this.notifications_service.getNotifications().subscribe(
      data => {
        event.target.complete();
      },
      error => {
        event.target.complete();
        console.log(error)
      },
      () => {
        event.target.complete();
      }
    );
  }

  goToUrl(url){
    var pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(url)) {
        url = "http://" + url;
    }
    // Opening a URL and returning an InAppBrowserObject
    this.browser.create(url, '_system');
  }

}
