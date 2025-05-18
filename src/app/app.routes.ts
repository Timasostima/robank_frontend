import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { LandingComponent } from './features/landing/landing.component';
import { Page404Component } from './features/page-404/page-404.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BillsComponent } from './features/bills/bills.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { GoalsComponent } from './features/goals/goals.component';
import { SettingsComponent } from './features/settings/settings.component';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  // Public routes (accessible without login)
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Protected routes (require authentication)
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'bills',
    component: BillsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'goals',
    component: GoalsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard]
  },

  // Wildcard route for 404 (accessible without login)
  { path: '**', component: Page404Component }
];
