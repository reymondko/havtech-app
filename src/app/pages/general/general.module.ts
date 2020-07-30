import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';

import { IonicModule } from '@ionic/angular';

import { GeneralPage } from './general.page';

import { SharedComponentsModule } from 'src/app/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: GeneralPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    SharedComponentsModule
  ],
  declarations: [GeneralPage]
})
export class GeneralPageModule {}
