import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  back_is_visible: any;
  @Input() eventType: any;
  router_location: any;
  constructor(
    public location: Location,
    public router: Router,
    public notification_service: NotificationService
  ) {
    if(this.router.url === '/home'){
      this.back_is_visible = false;
    }else{
      this.back_is_visible = true;
    }
    this.eventType = null;

    this.router_location = '/home'
  }

  ngOnInit() {
    if(this.router.url == '/sescheduledetail'){
      this.router_location = '/seschedule';
    }else if(this.eventType != null){
      if(this.eventType == 2){
        this.router_location = '/special-event';
      }else if(this.eventType == 3){
        this.router_location = '/learning-information';
      }else{
        this.router_location =  '/general-event';
      }
    }else if(this.router.url == '/map'){
      this.router_location = '/semap';
    }else if(this.router.url == '/special-event'){
      this.router_location = '/special';
    }else if(this.router.url == '/general-event'){
      this.router_location = '/general';
    }
    
  }

}
