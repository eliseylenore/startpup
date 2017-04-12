import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent }   from './admin/admin.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { NewSocialmediaComponent } from './new-socialmedia/new-socialmedia.component';
import { NeedComponent } from './need/need.component';


import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent
  },
  {
    path: 'new-project',
    component: NewProjectComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'users/:id',
    component: EditUserComponent
  },
  {
    path: 'projects/:id',
    component: NeedComponent
  }


 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
