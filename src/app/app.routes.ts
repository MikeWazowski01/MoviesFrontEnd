import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { DirectoresComponent } from './pages/directores/directores.component';

export const routes: Routes = [
     {path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'movies', pathMatch: 'full' }, 
      { path: 'movies', component: MoviesComponent },
      { path: 'director', component: DirectoresComponent }
    ]
  },
  { path: '**', redirectTo: '' } 

];
