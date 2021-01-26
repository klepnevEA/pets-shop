import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductPageComponent
      }
    ])
  ]
})
export class ProductPageModule { }
