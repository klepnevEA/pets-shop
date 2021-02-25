import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Iorder } from 'src/app/shared/interfaces';
import { CartService } from 'src/app/shared/services/cart.service';
@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent implements OnInit {
  private getOrdersSubscription!: Subscription;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.getOrdersSubscription = this.cartService.getOrders().subscribe((res) => {
      this.cartService.orders$.next(res);
    });
  }

  ngOnDestroy() {
    if (this.getOrdersSubscription) {
      this.getOrdersSubscription.unsubscribe();
    }
  }
}
