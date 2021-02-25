import { Pipe, PipeTransform } from '@angular/core';
import { IPet } from 'src/app/shared/interfaces';

@Pipe({
  name: 'searchPets',
})
export class SearchPipe implements PipeTransform {
  transform(pets: IPet[], search = ''): IPet[] {
    if (!search.trim()) {
      return pets;
    }

    return pets.filter((res) => {
      if (res.title === undefined) return;
      return res.title.toLowerCase().includes(search.toLowerCase());
    });
  }
}
