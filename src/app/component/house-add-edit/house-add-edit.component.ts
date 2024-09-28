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
import { HousingService } from '../../service/housing.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {NativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-house-add-edit',
  standalone: true,
  providers: [HousingService, NativeDateAdapter],
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    MatInputModule, MatFormFieldModule, MatRadioModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './house-add-edit.component.html',
  styleUrl: './house-add-edit.component.css'
})
export class HouseAddEditComponent {
  houseForm = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    photo: new FormControl(''),
    availableUnits: new FormControl(''),
    wifi: new FormControl(''),
    price: new FormControl('')
  });

  constructor(private houseService: HousingService, private dilogRef: MatDialogRef<HouseAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit(): void {
    this.houseForm.patchValue(this.data)
  }
  onFormSubmit() {
    if(this.houseForm.valid) {
      if(this.data) {
        this.houseService.editHouse(this.data.id, this.houseForm.value).subscribe({
          next: (val: any) => {
            alert("Update Successful")
            this.dilogRef.close(true);
          }, error: (err: any) => {
            console.log(err)
          }
        })
      } else {
        this.houseService.addHouse(this.houseForm.value).subscribe({
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
