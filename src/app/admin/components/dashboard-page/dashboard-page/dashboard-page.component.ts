import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubscriptionHelper, Subscriptions } from 'src/app/shared/helpers/subscription.helper';
import { IPet } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public pets$ = new BehaviorSubject<IPet[]>([]);
  public petsDisplay: string = 'petsCard';
  public sortList!: string;
  public category!: string;
  private subs: Subscriptions = {};

  constructor(public petService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subs.categorySubscription = this.petService.category$.subscribe((res) => {
      this.category = res;
      this.cdr.detectChanges();
    });

    this.subs.petSubscription = this.petService.getPet().subscribe((res) => {
      this.pets$.next(res);
    });
  }

  displayPets(str: string): void {
    this.petsDisplay = str;
  }

  removePet(id: any) {
    this.subs.removeSubscription = this.petService.removePet(id).subscribe(() => {
      this.petService.getPet().subscribe((res) => {
        this.pets$.next(res);
      });
    });
  }

  selectCategory(val: string) {
    this.petService.chengeCategory(val);
  }

  ngOnDestroy() {
    SubscriptionHelper.unsubscribe(this.subs);
  }
}
