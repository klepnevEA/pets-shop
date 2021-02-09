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
  public petsDisplay: string = "petsCard"
  public sortList!: string
  public selecterCategory!: string

  constructor(
    public petService: ProductService
  ) { }

  ngOnInit(): void {
    this.petSubscription = this.petService.getPet().subscribe(
      res => {
        this.pets$.next(res)
      }
    )
  }

  displayPets(str: string): void {
    console.log(str)
    this.petsDisplay = str
  }


  removePet(id: any) {
    this.removeSubscription = this.petService.removePet(id).subscribe(() => {
      this.petService.getPet().subscribe(
        res => {
          this.pets$.next(res)
        }
      )
    })
  }

  selectCategory(val: string) {
    this.selecterCategory = val
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
