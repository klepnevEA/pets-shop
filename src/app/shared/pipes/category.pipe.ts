import { Pipe, PipeTransform } from '@angular/core';
import { Ipet } from 'src/app/shared/interfaces';

@Pipe({
  name: 'categoryPets',
})
export class CategoryPipe implements PipeTransform {
  transform(pets: Ipet[], category = ''): Ipet[] {
    return pets.filter((res) => {
      if (res.type === undefined) return;
      if (category === 'all') return pets;
      return res.type.toLowerCase().includes(category.toLowerCase());
    });
  }
}
