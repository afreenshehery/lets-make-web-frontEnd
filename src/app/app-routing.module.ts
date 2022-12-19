import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesComponent } from './components/examples/examples.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { RegisterComponent } from './components/register/register.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AuthGuardAdminType } from './auth.guard.adminType';
import { AdminPlaceComponent } from './components/admin-place/admin-place.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'example', component: ExamplesComponent },
  { path: 'singUp', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'Query',
    component: ProjectInfoComponent,
    canActivate: [AuthGuardAdminType],
  },
  {
    path: 'user',
    component: UserprofileComponent,
    canActivate: [AuthGuardAdminType],
  },

  {
    path: 'singUpEdite/:postId',
    component: RegisterComponent,
    canActivate: [AuthGuardAdminType],
  },

  {
    path: 'admin',
    component: AdminPlaceComponent,
    canActivate: [AuthGuardAdminType],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
