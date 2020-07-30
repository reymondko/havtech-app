import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PasswordpromptPage } from './passwordprompt.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordpromptPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PasswordpromptPage]
})
export class PasswordpromptPageModule {}
