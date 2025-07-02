import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../../services/movie.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-agregar',
  imports: [MatToolbarModule,MatIconModule,MatSelectModule,MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {
    directorForm: FormGroup;
  constructor(private fb: FormBuilder, private movieServices: MovieService,private dialog: MatDialog,){
     this.directorForm = this.fb.group({
      name: ['',Validators.required],
      nationality: ['',Validators.required],
      age: ['',Validators.required],
      active:[true]
    });
  }
closeDialog() {
 this.dialog.closeAll();
}
guardarDirector() {
  this.movieServices.HttpPost("https://localhost:7095/api/Director/register-directores", this.directorForm.value).subscribe((data) => {
      this.closeDialog();
    });
}

}
