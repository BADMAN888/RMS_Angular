import { Component, OnInit, inject } from '@angular/core'
import { DishService } from '../../services/dish.service'
import { CategoryService } from '../../../categories/services/category.service'
import { Dish } from '../../models/dish.model'
import { Category } from '../../../categories/models/category.model'

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
  categories: Category[] = []

  selectedCategoryId: number | null = null

  page = 0
  size = 6
  totalPages = 0

  loading = false

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
    this.loading = true

    this.dishService.getAll(this.page, this.size, this.selectedCategoryId)
      .subscribe(res => {
        this.dishes = res.content
        this.totalPages = res.totalPages
        this.loading = false
      })
  }

  selectCategory(id: number | null) {
    this.selectedCategoryId = id
    this.page = 0
    this.loadDishes()
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++
      this.loadDishes()
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--
      this.loadDishes()
    }
  }
}
