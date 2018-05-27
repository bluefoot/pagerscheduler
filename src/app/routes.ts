/**
 * This file specifies the routes for Pager Scheduler app.
 * To use it, import AppRoutes class in the application module and 
 * import it using RouterModule.forRoot(AppRoutes)
 */
import { Routes } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

export const AppRoutes: Routes = [
    {path: '', component: HomeComponent}
];