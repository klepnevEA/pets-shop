import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iuser } from '../shared/interfaces';
import { UserService } from '../shared/services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public submited: boolean = false
  public form!: FormGroup
  public dataUser!: Iuser
  private sendSubscription!: Subscription

  constructor(
    private userService: UserService,
    private router: Router,
    ) {
      this.sendSubscription = this.userService.dataUser$.subscribe(res => {
        this.submited = false
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

  sendUser() {
    if (this.form.invalid) {
      return
    }

    this.submited = true

    this.dataUser = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      payment: this.form.value.payment,
      addres: this.form.value.addres,
      date: new Date()
    }

    this.userService.sendUser(this.dataUser)
  }

  ngOnDestroy() {
    if(this.sendSubscription) {
      this.sendSubscription.unsubscribe()
    }
  }
}
