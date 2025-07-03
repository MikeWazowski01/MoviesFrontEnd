import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../../services/movie.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Console } from 'node:console';

@Component({
  selector: 'app-agregar',
  imports: [MatToolbarModule, MatIconModule, MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {

  IDirector: any[] = [];
  movieForm: FormGroup;
  private _snackBar = inject(MatSnackBar);
  constructor(private fb: FormBuilder, private movieServices: MovieService, private dialog: MatDialog,private dialogRef: MatDialogRef<AgregarComponent>) {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      release_year: ['', Validators.required],
      gender: ['', Validators.required],
      duration: ['', Validators.required],
      idDirector: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getDirectores();
  }

  getDirectores() {
    this.movieServices.HttpGet("https://localhost:7095/api/Director/get-list-activos-directores").subscribe((data) => {
      this.IDirector = data;
    });


  }



  guardarMovie() {
    if (this.IDirector.length > 0) {
      this.movieServices.HttpPost("https://localhost:7095/api/Movies/register-movies", this.movieForm.value).subscribe((data) => {
        this.dialogRef.close(data); 
      });
    }else{
      this.openSnackBar('No hay Registro de Directores Agregue e intente de nuevo', 'Salir');
    }
  }


  closeDialog() {
    this.dialog.closeAll();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
