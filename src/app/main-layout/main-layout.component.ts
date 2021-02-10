import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iuser } from '../shared/interfaces';
import { ProductService } from '../shared/services/product.service';
import { UserService } from '../shared/services/users.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {

  private sendSubscription!: Subscription
  public userName!: string

  constructor(
    public petService: ProductService,
    private router: Router,
    public userService: UserService,
    ) {
      this.sendSubscription = this.userService.dataUser$.subscribe(res => {
        this.userName = res.name
      })

    }

  ngOnInit(): void {
    this.userService.dataUser$.next(JSON.parse(localStorage.getItem('users') || '{}'))
  }

  selectCategory(val: string) {
    this.router.navigate(['/'])
    if(val === 'card') {
      this.router.navigate(['/card'])
      return
    }
    this.petService.chengeCategory(val)
  }

  ngOnDestroy() {
    if(this.sendSubscription) {
      this.sendSubscription.unsubscribe()
    }
  }

}
