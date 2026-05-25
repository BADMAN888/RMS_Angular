import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dish } from '../models/dish.model';
import {PageResponse} from '../../../core/models/page-response.model';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  private api = 'http://localhost:8080/api/dishes';

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number, categoryId: number | null) {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (categoryId !== null) {
      params = params.set('categoryId', categoryId);
    }

    return this.http.get<PageResponse<Dish>>(this.api, { params });
  }

  getById(id: number) {
    return this.http.get<Dish>(`${this.api}/${id}`);
  }

  create(dish: Dish) {
    return this.http.post<Dish>(this.api, dish);
  }

  update(id: number, dish: Dish) {
    return this.http.put<Dish>(`${this.api}/${id}`, dish);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
