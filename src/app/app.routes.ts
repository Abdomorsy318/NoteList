import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { loggedGuardGuard } from './core/guards/logged-guard.guard';

export const routes: Routes = [
    {path:'' , component:AuthLayoutComponent , canActivate:[loggedGuardGuard] , children:[
        {path:'' , redirectTo:'login' , pathMatch:"full"},
        {path:'login' , component:LoginComponent},
        {path:'signup' , component:SignupComponent}
    ]
    },
    {path:'' , component:BlankLayoutComponent , canActivate:[authGuardGuard] ,children:[
        {path:'' , redirectTo:'home' , pathMatch:"full"},
        {path:'home' , component:HomeComponent}
    ]
    },
    {path:'**' , component:NotfoundComponent}
];
