import { Component, OnInit, inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { DishService } from '../../services/dish.service';
import { CategoryService } from '../../../categories/services/category.service';

import { Dish } from '../../models/dish.model';
import { Category } from '../../../categories/models/category.model';
import { PageResponse } from '../../../../core/models/page-response.model';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  private dishService = inject(DishService);
  private categoryService = inject(CategoryService);

  dishes: Dish[] = [];
  categories: Category[] = [];

  selectedCategoryId: number | null = null;

  page = 0;
  size = 6;
  totalPages = 0;

  loading = false;

  ngOnInit(): void {
    this.loadCategories();
    this.loadDishes();
  }

  loadCategories(): void {
    this.categoryService.getAll()
      .subscribe(res => {
        this.categories = res;
      });
  }

  loadDishes(): void {
    this.loading = true;

    this.dishService.getAll(
      this.page,
      this.size,
      this.selectedCategoryId
    )
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(res => {
        this.dishes = res.content;
        this.totalPages = res.totalPages;
      });
  }

  selectCategory(id: number | null): void {
    this.selectedCategoryId = id;
    this.page = 0;
    this.loadDishes();
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadDishes();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadDishes();
    }
  }
}
