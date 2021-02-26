import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  private orderDonSubscription!: Subscription;
  private cartServiceSubscription!: Subscription;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {}

  orderDone(id: string) {
    this.orderDonSubscription = this.cartService.orderDone(id).subscribe(() => {
      this.cartServiceSubscription = this.cartService.getOrders().subscribe((res) => {
        this.cartService.orders$.next(res);
      });
    });
  }

  ngOnDestroy() {
    if (this.orderDonSubscription) {
      this.orderDonSubscription.unsubscribe();
    }

    if (this.cartServiceSubscription) {
      this.cartServiceSubscription.unsubscribe();
    }
  }
}
