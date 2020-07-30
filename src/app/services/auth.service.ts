import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token:any;
  constructor(
    public http: HttpClient,
    public storage: Storage,
    public env: EnvService,
    public platform: Platform,
    public router: Router,
  ){}

 
  login(email: String, password: String) {

    // Clear token first in case a residual token has persisted
    this.storage.remove("token");
    this.isLoggedIn = false;
    delete this.token;

    return this.http.post(this.env.API_URL + 'auth/login',
      {email: email, password: password}
    ).pipe(
      tap(token => {
        this.storage.set('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  loginFirstTime(email: String, password: String, password_new: String) {
    // Clear token first in case a residual token has persisted
    this.storage.remove("token");
    this.isLoggedIn = false;
    delete this.token;
    return this.http.post(this.env.API_URL + 'auth/login-first',
      {email: email, password: password,password_new:password_new}
    ).pipe(
      tap(token => {
        this.storage.set('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  register(fName: String, lName: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {fName: fName, lName: lName, email: email, password: password}
    )
  }

  forgotPassword(email: String) {
    return this.http.post(this.env.API_URL + 'auth/password/reset',
      { email: email }
    )
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }

  getToken() {
    return this.storage.get('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }

  isAuthenticated(){
    return this.storage.get('token').then(
      data => {
        if(data != null) {
          this.token = data;
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      },
      error => {
        return false;
      }
    );
  }

  isAuthenticatedForLogin(){
    return this.storage.get('token').then(
      data => {
        if(data != null) {
          this.token = data;
          this.router.navigate(['/home']);
          return false;
        } else {
          return true;
        }
      },
      error => {
        return true
        ;
      }
    );
  }

  clearTokenAndLogOut(){
    this.storage.remove("token").then(
      data => {
        this.isLoggedIn = false;
        delete this.token;
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
    });
  }

}