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
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-editar',
  imports: [MatToolbarModule,MatIconModule,MatSelectModule,MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {

directorForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private fb: FormBuilder, private movieServices: MovieService,private dialog: MatDialog,){
     this.directorForm = this.fb.group({
      idDirector:[0],
      name: [''],
      nationality: [''],
      age: [''],
      active:[false]
    });
  }

  ngOnInit(){
    this.getRellenarFormulario();
  }

    private getRellenarFormulario() {
      console.log(this.data)
    this.directorForm.patchValue({
      idDirector:this.data.director.idDirector,
      name: this.data.director.name,
      nationality: this.data.director.nationality,
      age: this.data.director.age,
      active: this.data.director.active,
    });
  }
closeDialog() {
this.dialog.closeAll();
}
editarDirector() {
 this.movieServices.HttpPut("https://localhost:7095/api/Director", this.directorForm.value).subscribe((data) => {
      this.closeDialog();
    });
}
  
}
