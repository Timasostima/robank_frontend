import {Routes} from '@angular/router';
import {LoginComponent} from './features/login/login.component';
import {RegisterComponent} from './features/register/register.component';
import {Page404Component} from './features/page-404/page-404.component';
import {LandingComponent} from './features/landing/landing.component';
import {SettingsComponent} from './features/settings/settings.component';
import {BillsComponent} from './features/bills/bills.component';
import {CategoriesComponent} from './features/categories/categories.component';
import {GoalsComponent} from './features/goals/goals.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'bills', component: BillsComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'goals', component: GoalsComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '**', component: Page404Component},
];
