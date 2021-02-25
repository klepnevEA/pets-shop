import { Pipe, PipeTransform } from '@angular/core';
import { IPet } from 'src/app/shared/interfaces';

@Pipe({
  name: 'categoryPets',
})
export class CategoryPipe implements PipeTransform {
  transform(pets: IPet[], category = ''): IPet[] {
    return pets.filter((res) => {
      if (res.type === undefined) return;
      if (category === 'all') return pets;
      return res.type.toLowerCase().includes(category.toLowerCase());
    });
  }
}
