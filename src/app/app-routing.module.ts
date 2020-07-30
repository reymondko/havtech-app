import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'special',
    loadChildren: './pages/special/special.module#SpecialPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'special-event',
    loadChildren: './pages/special-event/special-event.module#SpecialEventPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule',canActivate: [LoginGuard]},
  { path: 'seschedule', loadChildren: './pages/seschedule/seschedule.module#SESchedulePageModule',canActivate: [AuthGuard]},
  { path: 'seaccomodations', loadChildren: './pages/seaccomodations/seaccomodations.module#SEAccomodationsPageModule',canActivate: [AuthGuard]},
  { path: 'sescheduledetail', loadChildren: './pages/sescheduledetail/sescheduledetail.module#SescheduledetailPageModule',canActivate: [AuthGuard]},
  { path: 'sedining', loadChildren: './pages/sedining/sedining.module#SEDiningPageModule' },
  { path: 'setransportation', loadChildren: './pages/setransportation/setransportation.module#SETransportationPageModule',canActivate: [AuthGuard]},
  { path: 'semap', loadChildren: './pages/semap/semap.module#SEMapPageModule',canActivate: [AuthGuard]},
  { path: 'setravel-host', loadChildren: './pages/setravel-host/setravel-host.module#SETravelHostPageModule',canActivate: [AuthGuard]},
  { path: 'general', loadChildren: './pages/general/general.module#GeneralPageModule',canActivate: [AuthGuard]},
  { path: 'general-event', loadChildren: './pages/general-event/general-event.module#GeneralEventPageModule',canActivate: [AuthGuard]},
  { path: 'upcoming', loadChildren: './pages/upcoming/upcoming.module#UpcomingPageModule',canActivate: [AuthGuard]},
  { path: 'news', loadChildren: './pages/news/news.module#NewsPageModule',canActivate: [AuthGuard]},
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'passwordprompt', loadChildren: './pages/passwordprompt/passwordprompt.module#PasswordpromptPageModule' },
  { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule',canActivate: [AuthGuard]},
  { path: 'gallery-slider', loadChildren: './pages/gallery-slider/gallery-slider.module#GallerySliderPageModule',canActivate: [AuthGuard]},
  { path: 'general-event2', loadChildren: './pages/general-event2/general-event2.module#GeneralEvent2PageModule',canActivate: [AuthGuard]},
  { path: 'gallery', loadChildren: './pages/gallery/gallery.module#GalleryPageModule',canActivate: [AuthGuard]},
  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule',canActivate: [AuthGuard]},
  { path: 'event-registration', loadChildren: './pages/event-registration/event-registration.module#EventRegistrationPageModule',canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' ,canActivate: [AuthGuard]},
  { path: 'first-login', loadChildren: './pages/first-login/first-login.module#FirstLoginPageModule' },
  { path: 'right-now-event', loadChildren: './pages/right-now-event/right-now-event.module#RightNowEventPageModule' ,canActivate: [AuthGuard]},
  { path: 'learning', loadChildren: './pages/learning/learning.module#LearningPageModule' },
  { path: 'learning-information', loadChildren: './pages/learning-information/learning-information.module#LearningInformationPageModule' },  { path: 'myevents', loadChildren: './myevents/myevents.module#MyeventsPageModule' }








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
