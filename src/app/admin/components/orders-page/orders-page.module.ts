import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderTableComponent } from './orders-page/order-table/order-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersPageComponent } from './orders-page/orders-page.component';

@NgModule({
  declarations: [OrdersPageComponent, OrderTableComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdersPageComponent,
      },
    ]),
  ],
})
export class OrdersPageModule {}
