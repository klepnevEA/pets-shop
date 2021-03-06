import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CardPageComponent } from './card-page/card-page.component';

@NgModule({
  declarations: [CardPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CardPageComponent,
      },
    ]),
  ],
})
export class CardPageModule {}
