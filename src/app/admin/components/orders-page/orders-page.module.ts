import { NgModule } from '@angular/core';
import { OrdersPageComponent } from './orders-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [OrdersPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdersPageComponent
      }
    ])
  ]
})
export class OrdersPageModule { }
