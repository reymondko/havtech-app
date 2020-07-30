import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:User;
  constructor(
    public http: HttpClient,
    public env: EnvService,
    public auth: AuthService
  ){}

  getUserDataFromApi() {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        this.user = user;
        return user;
      })
    )
    
  }

  // Upload photos from the current selected event
  updateUser(data,receive_notifications) {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.post(this.env.API_URL + 'auth/user/update',
    {data: data,receive_notifications:receive_notifications},
    {headers: headers}
    ).pipe(
      tap(result => {
        console.log(result);
      }),
    );
  }

}
