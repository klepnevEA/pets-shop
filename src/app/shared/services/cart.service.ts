import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IOrder } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public orders$ = new Subject<IOrder[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addOrder(order: IOrder) {
    return this.http.post(`${environment.fbDb}/orders.json`, order).pipe(
      map((res: any) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date),
        };
      }),
    );
  }

  getOrders() {
    return this.http.get(`${environment.fbDb}/orders.json`).pipe(
      map((res: any) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }));
      }),
    );
  }

  orderDone(id: string) {
    return this.http.delete(`${environment.fbDb}/orders/${id}.json`);
  }
}
