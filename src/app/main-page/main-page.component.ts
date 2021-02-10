import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Ipet } from '../shared/interfaces';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserService } from './../shared/services/users.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  public pets$ = new BehaviorSubject<Ipet[]>([])
  private petSubscription!: Subscription
  public category!: string;
  private categorySubscription!: Subscription

  constructor(
    private cdr: ChangeDetectorRef,
    public petService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.dataUser$.next(JSON.parse(localStorage.getItem('users') || '{}'))

    this.categorySubscription = this.petService.category$.subscribe(
      res => {
        this.category = res
        this.cdr.detectChanges();
      }
    )

    this.petSubscription = this.petService.getPet().subscribe(
      res => {
        this.pets$.next(res)
      }
    )
  }

  ngOnDestroy() {
    if(this.petSubscription) {
      this.petSubscription.unsubscribe()
    }

    if(this.categorySubscription) {
      this.categorySubscription.unsubscribe()
    }
  }

}
