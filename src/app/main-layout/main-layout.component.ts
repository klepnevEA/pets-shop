import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  public userName!: string;
  public cartCount: number = 0;

  private sendSubscription!: Subscription;
  private petSubscription!: Subscription;

  constructor(
    public petService: ProductService,
    public userService: UserService,
    private router: Router,
  ) {
    this.sendSubscription = this.userService.dataUser$.subscribe((res) => {
      this.userName = res.name;
    });

    this.petSubscription = this.petService.petsCartArray$.subscribe((res) => {
      this.cartCount = res.length;
    });
  }

  ngOnInit(): void {
    this.userService.dataUser$.next(JSON.parse(localStorage.getItem('users') || '{}'));
  }

  selectCategory(val: string) {
    this.router.navigate(['/']);
    if (val === 'card') {
      this.router.navigate(['/card']);
      return;
    }
    this.petService.chengeCategory(val);
  }

  ngOnDestroy() {
    if (this.sendSubscription) {
      this.sendSubscription.unsubscribe();
    }

    if (this.petSubscription) {
      this.petSubscription.unsubscribe();
    }
  }
}
