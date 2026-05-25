import { Injectable, inject } from '@angular/core'
import { ApiService } from '../../../core/services/api.service'
import { Observable } from 'rxjs'
import { PageResponse } from '../../../core/models/page-response.model'
import { Dish } from '../models/dish.model'

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private api = inject(ApiService)

  getAll(page: number, size: number, categoryId: number | null): Observable<PageResponse<Dish>> {
    let params = `?page=${page}&size=${size}`

    if (categoryId) {
      params += `&categoryId=${categoryId}`
    }

    return this.api.get<PageResponse<Dish>>(`/api/dishes${params}`)
  }
}
