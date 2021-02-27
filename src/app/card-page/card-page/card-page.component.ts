import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/users.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { IPet, IUser, IOrder } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';
import { SubscriptionHelper, Subscriptions } from 'src/app/shared/helpers/subscription.helper';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPageComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public dataUser!: IUser;
  public petsList: IPet[] = [];
  public price$ = new BehaviorSubject<number>(0);
  public arrange$ = new BehaviorSubject<boolean>(false);

  private dataOrder!: IOrder;
  private subs: Subscriptions = {};

  constructor(
    public petService: ProductService,
    private location: Location,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
  ) {
    this.subs.petsSubscription = this.petService.petsCartArray$.subscribe((res) => {
      this.petsList = res;
      this.totalPrice();
    });

    this.subs.sendSubscription = this.userService.dataUser$.subscribe((res) => {
      this.dataUser = res;
    });
  }

  ngOnInit(): void {
    this.userService.dataUser$.next(JSON.parse(localStorage.getItem('users') || '{}'));
    this.form = new FormGroup({
      name: new FormControl(this.dataUser.name, [Validators.required]),
      phone: new FormControl(this.dataUser.phone, [Validators.required]),
      payment: new FormControl('Карта'),
      addres: new FormControl(this.dataUser.addres, [Validators.required]),
    });
  }

  public sendOrder(): void {
    if (this.form.invalid) {
      return;
    }

    this.dataOrder = {
      order: this.petsList,
      name: this.form.value.name,
      phone: this.form.value.phone,
      payment: this.form.value.payment,
      addres: this.form.value.addres,
      date: new Date(),
    };

    this.subs.addOrderSubscription = this.cartService.addOrder(this.dataOrder).subscribe((res) => {
      console.log('заказ оформлен');
      this.router.navigate(['/']);
      this.petService.petsCartArray$.next([]);
    });
  }

  private totalPrice(): void {
    let price = 0;
    for (let i = 0; i < this.petsList.length; i++) {
      price += +this.petsList[i].price;
    }
    this.price$.next(price);
  }

  public deleteFromCart(pet: IPet): void {
    this.petService.deleteFromCart(pet);
  }

  public goBack(): void {
    this.location.back();
  }

  public arrangeOrder(val: boolean): void {
    this.arrange$.next(val);
  }

  ngOnDestroy(): void {
    SubscriptionHelper.unsubscribe(this.subs);
  }
}
