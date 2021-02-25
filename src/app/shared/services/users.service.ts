import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public authUser$ = new BehaviorSubject<boolean>(false);
  public dataUser$ = new Subject<IUser>();

  constructor() {
    this.dataUser$.next(JSON.parse(localStorage.getItem('users') || '{}'));
    this.dataUser$.subscribe((res) => {
      if (res.name) {
        this.authUser$.next(true);
      }
    });
  }

  sendUser(user: IUser) {
    localStorage.setItem('users', JSON.stringify(user));
    this.dataUser$.next(JSON.parse(localStorage.getItem('users') || '{}'));
  }
}
