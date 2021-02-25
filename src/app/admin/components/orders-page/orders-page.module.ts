import { NgModule } from '@angular/core';
import { OrdersPageComponent } from './orders-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderTableComponent } from './order-table/order-table.component';

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
