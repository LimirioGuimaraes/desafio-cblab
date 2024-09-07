import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RouteGuard } from './services/route-guard';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { BookPageComponent } from './components/book-page/book-page.component';


export const routes: Routes = [

    {path: '', component:HomeComponent, canActivate: [RouteGuard]},
    {path: 'home', component:HomeComponent, canActivate: [RouteGuard]},
    {path: 'login', component:LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'book/:id', component: BookPageComponent, canActivate: [RouteGuard]},
    {path: 'favorites', component: FavoritesComponent, canActivate: [RouteGuard]},
    {path: '**', component:HomeComponent},/* se nenhuma url for encontrada, redireciona para a home se não houver login, para o login*/
];
