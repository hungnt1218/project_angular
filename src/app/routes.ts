import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DetailsComponent } from './component/details/details.component';
import { LoginComponent } from './component/login/login.component';
import { AdmindashboardComponent } from './component/admindashboard/admindashboard.component';
import { HousingManagementComponent } from './component/housing-management/housing-management.component';
import { authGuard } from './auth.guard';
import { ProductComponent } from './component/product/product.component';
import { UserManagementComponent } from './component/user-management/user-management.component';
import { CartManagementComponent } from './component/cart-management/cart-management.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
    // canActivate: [authGuard]
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
    // canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'admin',
    component: AdmindashboardComponent,
    title: 'Admin Dashboard',
    // canActivate: [authGuard]
  },
  {
    path: 'house_manager',
    component: HousingManagementComponent,
    title: 'Housing Management',
    // canActivate: [authGuard]
  },
  {
    path: 'product',
    component: ProductComponent,
    title: 'Product Management',
    // canActivate: [authGuard]
  },
  {
    path: 'user_manager',
    component: UserManagementComponent,
    title: 'User Management',
    // canActivate: [authGuard]
  },
  {
    path: 'cart',
    component: CartManagementComponent,
    title: 'Cart Management',
    // canActivate: [authGuard]
  }
];

export default routeConfig;
