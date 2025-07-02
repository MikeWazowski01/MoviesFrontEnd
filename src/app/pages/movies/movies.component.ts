import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgregarComponent } from './agregar/agregar.component';
import { EditarComponent } from './editar/editar.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatMenuModule, CommonModule, MatSelectModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  IMovies: any[] = [];
  IDirector: any[] = [];
  idDirector: number | null = null;
  titulo: string = 'Listado de Peliculas';
  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  constructor(private movieServices: MovieService) {
  }


  ngOnInit() {
    this.buscarMoviDirector();
    this.getDirectores();
  }

  getMovies() {
    this.movieServices.HttpGet("https://localhost:7095/api/Movies/get-list-movies").subscribe((data) => {
      this.IMovies = data;
    });
  }

  getDirectores() {
    this.movieServices.HttpGet("https://localhost:7095/api/Director/get-list-activos-directores").subscribe((data) => {
      this.IDirector = data;
    });
  }

  deleteMovie(movie: any) {


    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { name: movie.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.movieServices.HttpDelete("https://localhost:7095/api/Movies/" + movie.idMovie).subscribe((data) => {
          this.openSnackBar('La pelicual fue eliminado', 'Salir');

          this.getMovies();
        });
      }
    });
  }

  editMovie(movie: any) {
    const dialogRef = this.dialog.open(EditarComponent, {
      data: { movie: movie },
      autoFocus: false,
      minWidth: '400px',
      width: '30%',
      height: 'auto',
      disableClose: true,
      panelClass: ['mat-elevation-z8']
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMovies();
    });
    /* console.log(movie)
     this.movieServices.HttpPut("https://localhost:7095/api/Movies", { movie }).subscribe((data) => {
       this.openSnackBar('La pelicual actualizada', 'Salir');
       this.getMovies();
     });*/
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  agregarMovie() {
    const dialogRef = this.dialog.open(AgregarComponent, {
      autoFocus: false,
      minWidth: '400px',
      width: '30%',
      height: 'auto',
      disableClose: true,
      panelClass: ['mat-elevation-z8']
    });

    dialogRef.afterClosed().subscribe(result => {
      this.idDirector=0;
      this.buscarMoviDirector();
    });
  }

  buscarMoviDirector() {
    if(this.idDirector != null){
      this.movieServices.HttpGet("https://localhost:7095/api/Movies/" +this.idDirector).subscribe((data) => {
         this.IMovies = data;
        });
    }
  }
}
