import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { IPet } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  public pets$ = new BehaviorSubject<IPet[]>([]);
  public category!: string;
  private petSubscription!: Subscription;
  private categorySubscription!: Subscription;

  constructor(
    public petService: ProductService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.dataUser$.next(JSON.parse(localStorage.getItem('users') || '{}'));

    this.categorySubscription = this.petService.category$.subscribe((res) => {
      this.category = res;
      this.cdr.detectChanges();
    });

    this.petSubscription = this.petService.getPet().subscribe((res) => {
      this.pets$.next(res);
    });
  }

  ngOnDestroy() {
    if (this.petSubscription) {
      this.petSubscription.unsubscribe();
    }

    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
