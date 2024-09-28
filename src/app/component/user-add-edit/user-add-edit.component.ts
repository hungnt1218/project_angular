import { Component, INJECTOR, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-add-edit',
  standalone: true,
  providers: [UserService],
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    MatInputModule, MatFormFieldModule, MatRadioModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.css'
})
export class UserAddEditComponent {
  userForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('')
  });

  constructor(private userService: UserService, private dilogRef: MatDialogRef<UserAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit(): void {
    this.userForm.patchValue(this.data)
  }
  onFormSubmit() {
    if(this.userForm.valid) {
      if(this.data) {
        this.userService.editUser(this.data.id, this.userForm.value).subscribe({
          next: (val: any) => {
            alert("Update Successful")
            this.dilogRef.close(true);
          }, error: (err: any) => {
            console.log(err)
          }
        })
      } else {
        this.userService.addUser(this.userForm.value).subscribe({
          next: (val: any) => {
            alert("Add Successful")
            this.dilogRef.close(true);
          }, error: (err: any) => {
            console.log(err)
          }
        })
      }
      
    }
  }
}
