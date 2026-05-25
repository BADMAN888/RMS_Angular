import { Routes } from '@angular/router'
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component'
import { HomePageComponent } from './features/home/pages/home-page/home-page.component'

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      }
    ]
  }
]
