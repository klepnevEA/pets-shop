import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Ipet, Iuser } from '../shared/interfaces';
import { ProductService } from '../shared/services/product.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/users.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  public dataUser!: Iuser

  public petsList: Ipet[] = []
  public price$ = new BehaviorSubject<number>(0)
  public arrange$ = new BehaviorSubject<boolean>(false)
  private petsSubscription!: Subscription
  private sendSubscription!: Subscription

  constructor(
    public petService: ProductService,
    private location: Location,
    private userService: UserService,
  ) {
    this.petsSubscription = this.petService.petsCartArray$.subscribe(res => {
      this.petsList = res
      this.totalPrice()
    })

    this.sendSubscription = this.userService.dataUser$.subscribe(res => {
      this.dataUser = res
    })
  }

  ngOnInit(): void {
    this.userService.dataUser$.next(JSON.parse(localStorage.getItem('users') || '{}'))
    this.form = new FormGroup({
      name: new FormControl(this.dataUser.name, [Validators.required]),
      phone: new FormControl(this.dataUser.phone, [Validators.required]),
      payment: new FormControl("Карта"),
      addres: new FormControl(this.dataUser.addres, [Validators.required]),
    })
  }

  sendOrder() {
    if (this.form.invalid) {
      return
    }

    this.dataUser = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      payment: this.form.value.payment,
      addres: this.form.value.addres,
      date: new Date()
    }

    console.log(this.petsList)
    // this.userService.sendUser(this.dataUser)
  }

  totalPrice(): void {
    let price = 0
    for(let i = 0; i < this.petsList.length; i++) {
      price += +this.petsList[i].price
    }
    this.price$.next(price)
  }

  deleteFromCart(pet: Ipet): void {

    this.petService.deleteFromCart(pet)
  }

  goBack(): void {
    this.location.back()
  }

  arrangeOrder(): void {
    this.arrange$.next(true)
  }

  ngOnDestroy() {
    if(this.petsSubscription) {
      this.petsSubscription.unsubscribe()
    }

    if(this.sendSubscription) {
      this.sendSubscription.unsubscribe()
    }

  }

}
