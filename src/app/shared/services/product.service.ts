import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ipet } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public pets$ = new BehaviorSubject<Ipet[]>([])
  public categories = [
    'Котики',
    'Собачки',
    'Попугаи'
  ]

  public category$ = new BehaviorSubject<string>('all')

  constructor(private http:HttpClient) { }

  chengeCategory(val: string) {
    this.category$.next(val)
  }

  addPet(pet : Ipet) {
    return this.http.post(`${environment.fbDb}/pets.json`, pet)
    .pipe(map((res : any) => {
      return {
        ...pet,
        id: res.name,
        date: new Date(pet.date)
      }
    }))
  }

  getPet() {
    return this.http.get(`${environment.fbDb}/pets.json`)
    .pipe(
      map((res: any) => {
        return Object.keys(res)
        .map((key) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date)
        }))

        }
      )
    )
  }

  getPetId(id: string) {
    return this.http.get(`${environment.fbDb}/pets/${id}.json`)
    .pipe(
      map((res: any) => {
        return {
            ...res,
            id,
            date: new Date(res.date)
          }
        }
      )
    )
  }

  removePet (id: string) {
    return this.http.delete(`${environment.fbDb}/pets/${id}.json`)
  }

  editPet(pet: Ipet) {
    return this.http.patch(`${environment.fbDb}/pets/${pet.id}.json`, pet)
  }
}
