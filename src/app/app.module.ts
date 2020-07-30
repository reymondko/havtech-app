import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule }    from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { Deeplinks } from '@ionic-native/deeplinks/ngx';

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { ShowHidePasswordModule } from "ngx-show-hide-password";


@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ShowHidePasswordModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
    Camera,
    ImagePicker,
    OneSignal,
    InAppBrowser,
    FileTransfer,
    File,
    FileOpener,
    Deeplinks
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
