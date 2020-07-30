import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { AuthService } from './auth.service';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { timer, of } from 'rxjs';
import { not } from '@angular/compiler/src/output/output_ast';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications: any;
  onesignal_player_id: any;
  constructor(
    public http: HttpClient,
    public env: EnvService,
    public auth: AuthService,
    public oneSignal: OneSignal,
    public router: Router
  ) {
    this.notifications = {
      'read':[],
      'unread':[]
    };
    this.onesignal_player_id = null;
  }

  checkNotifications() {
    if(this.notifications){
       return timer(2000, 30000)
      .pipe(
          switchMap(_ => this.getCheckNotificationFromApi()),
          catchError(error => of(`Bad request: ${error}`))
      );
    }
  }

  getCheckNotificationFromApi(){
    if(this.auth.token != undefined){
      const headers = new HttpHeaders({
        'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
      });
      return this.http.get(this.env.API_URL + 'auth/user/notifications', { headers: headers }).pipe(
        tap(notifications => {
          this.notifications = notifications
        })
      )
    }else{
      return [];
    }
  }

  getNotifications(){
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/user/notifications', { headers: headers }).pipe(
      tap(notifications => {
        this.notifications = notifications
      })
    )
  }

  markNotifications(userNotificationId){
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/user/notifications/mark/'+userNotificationId, { headers: headers }).pipe(
      tap(notifications => {
        this.notifications = notifications
      })
    )
  }

  setOnesignalPlayerId(){
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.post(this.env.API_URL + 'auth/user/notifications/onesignal-player-id',{ onesignal_player_id: this.onesignal_player_id }, { headers: headers }).pipe(
      tap(notifications => {
        this.notifications = notifications
      })
    )
  }

  initializeOnesignal(){
    this.oneSignal.startInit('9a6fca07-fd3d-4195-a53b-e059b93d2748', '135478991436');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe(() => {
    // do something when notification is received
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      this.router.navigate(['/notifications']);
    });
    this.oneSignal.endInit();
    this.oneSignal.getIds().then((id) => {
      this.onesignal_player_id = id.userId;
    });
  }
  
}
