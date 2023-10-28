import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { authGuard } from './core/auth/auth.guard';
import { DashboardComponent } from './core/pages/dashboard/dashboard.component';
import { LoginComponent } from './core/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },


  {
    path: 'dashboard',
    component: DashboardComponent, canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) }, {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: environment.routeTracing,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
