import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    public browser: InAppBrowser,
    public platform: Platform
  ) { }

  openMapUrlFromAddress(
    address1 = null,
    address2 = null,
    city = null,
    state = null,
    zip = null,
    country = null,
  ){
    
    let mapUrl = 'https://maps.google.com/?q=';
    if (this.platform.is('ios')) {
      mapUrl = 'https://maps.apple.com/?address=';
    }
    
    
    if(address1 != null){
      mapUrl = mapUrl + '' + address1;
    }
    if(address2 != null){
      mapUrl = mapUrl + ', ' + address2;
    }
    if(city != null){
      mapUrl = mapUrl + ', ' + city;
    }
    if(state != null){
      mapUrl = mapUrl + ', ' + state;
    }
    if(zip != null){
      mapUrl = mapUrl + ', ' + zip;
    }
    if(country != null){
      mapUrl = mapUrl + ', ' + country;
    }
    
    if(mapUrl != 'https://maps.google.com/?q='){
      this.browser.create(mapUrl, '_system');
    }
  }

  // Workaround for the keyvalue pipe 
  // Not retaining correct sort order
  preserveListOrder(a,b){
    return 1;
  }
}
