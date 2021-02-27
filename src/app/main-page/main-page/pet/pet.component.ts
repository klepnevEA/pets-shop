import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPet } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetComponent {
  @Input() pet!: IPet;

  public active$ = new BehaviorSubject<boolean>(false);

  constructor(public petService: ProductService) {}

  public addToCart(pet: IPet): void {
    this.active$.next(true);
    this.petService.addToCart(pet);
  }

  public deleteFromCart(pet: IPet): void {
    this.active$.next(false);
    this.petService.deleteFromCart(pet);
  }
}
