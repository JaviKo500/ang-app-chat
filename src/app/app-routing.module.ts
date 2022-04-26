import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import( './auth/auth.module' ).then( m => m.AuthModule )
  },
  {
    path: 'inbox',
    loadChildren: () => import( './inbox/inbox.module' ).then( m => m.InboxModule)
  },
  {
    path: '**',
    redirectTo: 'signin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
