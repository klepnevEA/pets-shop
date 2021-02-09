import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {

  constructor(public petService: ProductService) { }

  ngOnInit(): void {
  }

  selectCategory(val: string) {
    this.petService.chengeCategory(val)

  }

}
