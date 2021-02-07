import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Ipet } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  public pets$ = new BehaviorSubject<Ipet[]>([])
  private petSubscription!: Subscription
  private removeSubscription!: Subscription

  constructor(
    private prodictService: ProductService
  ) { }

  ngOnInit(): void {
    this.petSubscription = this.prodictService.getPet().subscribe(
      res => {
        this.pets$.next(res)
      }
    )
  }


  removePet(id: any) {
    this.removeSubscription = this.prodictService.removePet(id).subscribe(() => {
      this.prodictService.getPet().subscribe(
        res => {
          this.pets$.next(res)
        }
      )
    })
  }

  ngOnDestroy() {
    if(this.petSubscription) {
      this.petSubscription.unsubscribe()
    }

    if(this.removeSubscription) {
      this.removeSubscription.unsubscribe()
    }
  }

}
