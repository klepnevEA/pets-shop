import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SubscriptionHelper, Subscriptions } from 'src/app/shared/helpers/subscription.helper';
import { CartService } from 'src/app/shared/services/cart.service';
@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent implements OnInit {
  private subs: Subscriptions = {};

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  private getAllOrders(): void {
    this.subs.getOrdersSubscription = this.cartService.getOrders().subscribe((res) => {
      this.cartService.orders$.next(res);
    });
  }

  ngOnDestroy(): void {
    SubscriptionHelper.unsubscribe(this.subs);
  }
}
