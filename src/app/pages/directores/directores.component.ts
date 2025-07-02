import { Component, inject, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { IDirector } from '../../models/Director';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-directores',
  imports: [MatTableModule, MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatMenuModule, CommonModule, MatSelectModule, FormsModule],
  templateUrl: './directores.component.html',
  styleUrl: './directores.component.css'
})
export class DirectoresComponent {

  IDirectores: any[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  private dialog = inject(MatDialog);
  dataSource: MatTableDataSource<IDirector> = new MatTableDataSource();
  private _snackBar = inject(MatSnackBar);
  displayedColumns: string[] = ['actions', 'idDirector', 'name', 'nationality', 'age', 'active'];
  constructor(private movieServices: MovieService) { }
  ngOnInit() {
    this.getDirectores();
  }

  getDirectores() {
    this.movieServices.HttpGet("https://localhost:7095/api/Director/get-list-directores").subscribe((data) => {
      this.dataSource = data;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource)
    });
  }

  editDirector(director: any) {
    const dialogRef = this.dialog.open(EditarComponent, {
      data: { director: director },
      autoFocus: false,
      minWidth: '400px',
      width: '30%',
      height: 'auto',
      disableClose: true,
      panelClass: ['mat-elevation-z8']
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDirectores();
    });

  }
  deleteDirector(director: any) {
    if (director.CounMovies == 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { name: director.name }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.movieServices.HttpDelete("https://localhost:7095/api/Director/" + director.idDirector).subscribe((data) => {
            this.openSnackBar('El Director fue eliminado', 'Salir');

            this.getDirectores();
          });
        }
      });
    }else{
      this.openSnackBar('Elimine las movies primero', 'Salir');
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  addDirector() {
    const dialogRef = this.dialog.open(AgregarComponent, {
      autoFocus: false,
      minWidth: '400px',
      width: '30%',
      height: 'auto',
      disableClose: true,
      panelClass: ['mat-elevation-z8']
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDirectores();
    });
  }

}
