import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {

  constructor(
    public petService: ProductService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  selectCategory(val: string) {
    this.router.navigate(['/'])
    if(val === 'card') {
      this.router.navigate(['/card'])
      return
    }
    this.petService.chengeCategory(val)
  }

}
