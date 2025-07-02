import { Component, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../../services/movie.service';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-editar',
  imports: [MatToolbarModule, MatIconModule, MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  IDirector: any[] = [];
  movieForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder, private movieServices: MovieService, private dialog: MatDialog,) {
    this.movieForm = this.fb.group({
      idMovie:[0],
      name: [''],
      release_year: [''],
      gender: [''],
      duration: [''],
      idDirector: [0]
    });

    console.log(data);
  }

  ngOnInit() {
    this.getDirectores();
    this.getRellenarFormulario();
  }

  getDirectores() {
    this.movieServices.HttpGet("https://localhost:7095/api/Director/get-list-activos-directores").subscribe((data) => {
      this.IDirector = data;
    });
  }

  private getRellenarFormulario() {
    this.movieForm.patchValue({
      idMovie:this.data.movie.idMovie,
      name: this.data.movie.name,
      release_year: this.data.movie.release_year.split('T')[0],
      gender: this.data.movie.gender,
      duration: this.data.movie.duration,
      idDirector: this.data.movie.idDirector
    });
  }
  editarMovie() {
    this.movieServices.HttpPut("https://localhost:7095/api/Movies", this.movieForm.value).subscribe((data) => {
      this.closeDialog();
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }

}
