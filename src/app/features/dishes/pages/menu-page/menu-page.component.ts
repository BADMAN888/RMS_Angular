import { Component, OnInit, inject } from '@angular/core'

import { CategoryService } from '../../../categories/services/category.service'
import { Dish } from '../../models/dish.model'
import { Category } from '../../../categories/models/category.model'
import {DishService} from '../../../../core/services/dish.service';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss'
})
export class MenuPageComponent implements OnInit {

  private dishService = inject(DishService)
  private categoryService = inject(CategoryService)

  dishes: Dish[] = []
  filteredDishes: Dish[] = []
  categories: Category[] = []

  selectedCategoryId: number | null = null

  ngOnInit() {
    this.loadCategories()
    this.loadDishes()
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(res => {
      this.categories = res
    })
  }

  loadDishes() {
    this.dishService.getAll().subscribe(res => {
      this.dishes = res
      this.filteredDishes = res
    })
  }

  selectCategory(id: number | null) {
    this.selectedCategoryId = id

    if (!id) {
      this.filteredDishes = this.dishes
      return
    }

    this.filteredDishes = this.dishes.filter(d => d.categoryId === id)
  }
}
