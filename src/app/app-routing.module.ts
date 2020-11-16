import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'test',loadChildren: () => import('./pages/test/test.module').then(m => m.TestModule) },
  { path: 'test2',loadChildren: () => import('./pages/test2/test2.module').then(m => m.TestModule) },
  { path: 'test3',loadChildren: () => import('./pages/test3/test3.module').then(m => m.TestModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
