import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ipet } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

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
}
