import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'create-entry',
    loadChildren: () => import('./pages/create-entry/create-entry.module').then( m => m.CreateEntryPageModule)
  },
  {
    path: 'setup-profile',
    loadChildren: () => import('./pages/setup-profile/setup-profile.module').then( m => m.SetupProfilePageModule)
  },
  {
    path: 'view-entry',
    loadChildren: () => import('./pages/view-entry/view-entry.module').then( m => m.ViewEntryPageModule)
  },
  {
    path: 'view-entries',
    loadChildren: () => import('./pages/view-entries/view-entries.module').then( m => m.ViewEntriesPageModule)
  },
  {
    path: 'search-entries',
    loadChildren: () => import('./pages/search-entries/search-entries.module').then( m => m.SearchEntriesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
