import { NgModule } from '@angular/core';
import { ProductPageComponent } from './product-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductPageComponent,
      },
    ]),
  ],
})
export class ProductPageModule {}
