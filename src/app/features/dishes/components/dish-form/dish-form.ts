import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';

import { DishService } from '../../services/dish.service';
import { Dish } from '../../models/dish.model';
import { CreateDishRequest, UpdateDishRequest } from '../../models/dish.model';

@Component({
  selector: 'app-dish-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss']
})
export class DishFormComponent {

  private fb = inject(NonNullableFormBuilder);
  private dishService = inject(DishService);

  editMode = false;
  currentDishId: number | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: ['', Validators.required],
    status: ['AVAILABLE' as Dish['status'], Validators.required]
  });

  // 🔥 CREATE / UPDATE
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.editMode && this.currentDishId !== null) {
      // ===== UPDATE =====
      const updateDish: UpdateDishRequest = {
        id: this.currentDishId,
        ...this.form.getRawValue()
      };

      this.dishService.update(updateDish).subscribe({
        next: (res) => console.log('Updated:', res),
        error: (err) => console.error('Update error:', err)
      });

    } else {
      // ===== CREATE =====
      const createDish: CreateDishRequest = this.form.getRawValue();

      this.dishService.create(createDish).subscribe({
        next: (res) => console.log('Created:', res),
        error: (err) => console.error('Create error:', err)
      });
    }
  }

  // 🔥 SET DATA FOR EDIT
  setEditDish(dish: Dish): void {
    this.editMode = true;
    this.currentDishId = dish.id;

    this.form.patchValue({
      name: dish.name,
      description: dish.description,
      imageUrl: dish.imageUrl,
      status: dish.status
    });
  }

  // 🔥 RESET
  reset(): void {
    this.form.reset({
      name: '',
      description: '',
      imageUrl: '',
      status: 'AVAILABLE'
    });

    this.editMode = false;
    this.currentDishId = null;
  }
}
