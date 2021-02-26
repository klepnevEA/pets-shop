import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SubscriptionHelper, Subscriptions } from '../helpers/subscription.helper';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public authUser$ = new BehaviorSubject<boolean>(false);
  public dataUser$ = new Subject<IUser>();

  private subs: Subscriptions = {};

  constructor() {
    this.dataUser$.next(JSON.parse(localStorage.getItem('users') || '{}'));
    this.subs.dataUserSubscription = this.dataUser$.subscribe((res) => {
      if (res.name) {
        this.authUser$.next(true);
      }
    }); /*#toDo вырезать это все из конструктора*/
  }

  sendUser(user: IUser) {
    localStorage.setItem('users', JSON.stringify(user));
    this.dataUser$.next(JSON.parse(localStorage.getItem('users') || '{}'));
  }

  ngOnDestroy() {
    SubscriptionHelper.unsubscribe(this.subs);
  }
}
