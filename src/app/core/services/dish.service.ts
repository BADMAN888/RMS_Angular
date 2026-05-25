import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private api: ApiService) {}

  getAll(): Observable<any> {
    return this.api.get('/api/dishes')
  }
}
