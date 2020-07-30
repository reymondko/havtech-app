import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = '';

  constructor(
    public platform: Platform
  ) {
   this.API_URL = this.getAPIUrl();
  }

  /**
   * Determines if request if ran
   * through the ionic serve command
   */
  getAPIUrl() {
    if (this.platform.is('mobileweb')) {
      return 'http://localhost:8000/api/';
     //return 'http://havtecheventsapp.com.52-44-126-31.mojo.biz/api/';
    } else {
      return 'https://www.havtechevents.com/api/';
      //return 'http://havtecheventsapp.com.52-44-126-31.mojo.biz/api/';
    }
  }
}
