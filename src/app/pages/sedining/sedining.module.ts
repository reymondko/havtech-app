import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { SEDiningPage } from './sedining.page';
import { SharedComponentsModule } from 'src/app/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: SEDiningPage
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
  providers:[
    DatePipe
  ],
  declarations: [SEDiningPage]
})
export class SEDiningPageModule {}
