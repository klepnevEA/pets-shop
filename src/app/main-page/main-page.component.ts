import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Ipet } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  public pets$!: Observable<any>
  constructor(
    private pestService: ProductService
  ) { }

  ngOnInit(): void {
    console.log(this.pestService.getPet())
    this.pets$ = this.pestService.getPet()
  }

}
