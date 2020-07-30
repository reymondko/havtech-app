import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyeventsPage } from './myevents.page';

import { SharedComponentsModule } from 'src/app/shared-components.module';
const routes: Routes = [
  {
    path: '',
    component: MyeventsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [MyeventsPage]
})
export class MyeventsPageModule {}
