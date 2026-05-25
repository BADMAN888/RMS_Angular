import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dish } from '../models/dish.model';
import {PageResponse} from '../../../core/models/page-response.model';

@Injectable({ providedIn: 'root' })
export class DishService {

  private http = inject(HttpClient);

  getAll(page: number, size: number, categoryId: number | null) {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (categoryId !== null) {
      params = params.set('categoryId', categoryId);
    }

    return this.http.get<PageResponse<Dish>>(
      '/api/dishes',
      { params }
    );
  }
}
