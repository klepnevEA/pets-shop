import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPet } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetComponent implements OnInit {
  @Input() pet!: IPet;

  public active$ = new BehaviorSubject<boolean>(false);

  constructor(public petService: ProductService) {}

  ngOnInit(): void {}

  addToCart(pet: IPet) {
    this.active$.next(true);
    this.petService.addToCart(pet);
  }

  deleteFromCart(pet: IPet) {
    this.active$.next(false);
    this.petService.deleteFromCart(pet);
  }
}
