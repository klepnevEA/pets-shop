import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionHelper, Subscriptions } from 'src/app/shared/helpers/subscription.helper';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTableComponent implements OnInit, OnDestroy {
  @Input() order!: any;

  public active: boolean = false;

  private subs: Subscriptions = {};

  constructor(public cartService: CartService) {}

  ngOnInit(): void {}

  orderDone(id: string) {
    this.subs.orderDonSubscription = this.cartService.orderDone(id).subscribe(() => {
      this.subs.cartServiceSubscription = this.cartService.getOrders().subscribe((res) => {
        this.cartService.orders$.next(res);
      });
    });
  }

  ngOnDestroy() {
    SubscriptionHelper.unsubscribe(this.subs);
  }
}
