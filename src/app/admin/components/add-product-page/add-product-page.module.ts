import { NgModule } from '@angular/core';
import { AddProductPageComponent } from './add-product-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AddProductPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddProductPageComponent
      }
    ])
  ]
})
export class AddProductPageModule { }
