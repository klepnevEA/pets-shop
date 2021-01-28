import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [MainPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent
      }
    ])
  ]
})
export class MainPageModule { }
