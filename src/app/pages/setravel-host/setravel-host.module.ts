import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';

import { SETravelHostPage } from './setravel-host.page';

import { SharedComponentsModule } from 'src/app/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: SETravelHostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
    PipesModule
  ],
  declarations: [SETravelHostPage]
})
export class SETravelHostPageModule {}
