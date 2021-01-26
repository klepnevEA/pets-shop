import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPageComponent } from './card-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CardPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CardPageComponent
      }
    ])
  ]
})
export class CardPageModule { }
