import { Injectable, inject } from '@angular/core'
import { ApiService } from '../../../core/services/api.service'
import { Observable } from 'rxjs'
import { Category } from '../models/category.model'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api = inject(ApiService)

  getAll(): Observable<Category[]> {
    return this.api.get('/api/categories')
  }
}
