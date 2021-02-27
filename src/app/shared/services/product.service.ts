import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPet } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public pets$ = new BehaviorSubject<IPet[]>([]);
  public petsCartArray$ = new BehaviorSubject<IPet[]>([]);
  public categories = ['Котики', 'Собачки', 'Попугаи'];
  public category$ = new BehaviorSubject<string>('all');

  constructor(private http: HttpClient) {}

  public chengeCategory(val: string): void {
    this.category$.next(val);
  }

  public addPet(pet: IPet): Observable<IPet> {
    return this.http.post(`${environment.fbDb}/pets.json`, pet).pipe(
      map((res: any) => {
        return {
          ...pet,
          id: res.name,
          date: new Date(pet.date),
        };
      }),
    );
  }

  public getPet(): Observable<IPet[]> {
    return this.http.get(`${environment.fbDb}/pets.json`).pipe(
      map((res: any) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }));
      }),
    );
  }

  public getPetId(id: string): Observable<IPet> {
    return this.http.get(`${environment.fbDb}/pets/${id}.json`).pipe(
      map((res: any) => {
        return {
          ...res,
          id,
          date: new Date(res.date),
        };
      }),
    );
  }

  public removePet(id: string): Observable<any> {
    return this.http.delete(`${environment.fbDb}/pets/${id}.json`);
  }

  public editPet(pet: IPet): Observable<any> {
    return this.http.patch(`${environment.fbDb}/pets/${pet.id}.json`, pet);
  }

  public addToCart(pet: IPet): void {
    const petArr: IPet[] = this.petsCartArray$.getValue();
    let stop = true;
    petArr.forEach((item) => {
      if (item.id === pet.id) {
        stop = false;
      }
    });
    if (stop) {
      this.petsCartArray$.next(this.petsCartArray$.getValue().concat([pet]));
    }
  }

  public deleteFromCart(pet: IPet): void {
    const petArr: IPet[] = this.petsCartArray$.getValue();
    petArr.forEach((item, index) => {
      if (item === pet) {
        petArr.splice(index, 1);
      }
    });
    this.petsCartArray$.next(petArr);
  }
}
