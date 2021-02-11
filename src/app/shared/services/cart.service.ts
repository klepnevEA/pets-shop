import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Iorder, Ipet, } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public pets$ = new BehaviorSubject<Ipet[]>([])

  constructor(
    private http:HttpClient,
    private router: Router,

    ) { }

  addOrder(order: Iorder) {
    return this.http.post(`${environment.fbDb}/orders.json`, order)
    .pipe(map((res : any) => {
      return {
        ...order,
        id: res.name,
        date: new Date(order.date)
      }
    }))
  }

  getOrder() {}
}
