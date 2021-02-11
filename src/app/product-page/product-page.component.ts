import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import { Location } from '@angular/common';
import { Ipet } from '../shared/interfaces';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit {

  public pet$!: Observable<Ipet>

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.pet$ = this.route.params
    .pipe(
      switchMap(params => {
        return  this.productService.getPetId(params['id'])
      })
    )
  }

  goBack(): void {
    this.location.back()
  }

}
