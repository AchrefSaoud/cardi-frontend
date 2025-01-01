import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'landing-page', component: LandingpageComponent },
  { 
    path: 'home', 
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'list-users', pathMatch: 'full' },
      { path: 'list-users', component: UserListComponent },
    ]
  },
  { path: '**', redirectTo: '/landing-page' }
];

