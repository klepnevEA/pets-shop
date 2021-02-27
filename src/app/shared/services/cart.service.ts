import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IOrder } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public orders$ = new Subject<IOrder[]>();

  constructor(private http: HttpClient, private router: Router) {}

  public addOrder(order: IOrder): Observable<IOrder> {
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

  public getOrders(): Observable<IOrder[]> {
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

  public orderDone(id: string): Observable<any> {
    return this.http.delete(`${environment.fbDb}/orders/${id}.json`);
  }
}
