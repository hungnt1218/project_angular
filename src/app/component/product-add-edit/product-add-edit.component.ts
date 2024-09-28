import { Component, INJECTOR, Inject } from '@angular/core';
import {
  MatDialog,
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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-product-add-edit',
  standalone: true,
  providers: [NativeDateAdapter],
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    MatInputModule, MatFormFieldModule, MatRadioModule, ReactiveFormsModule,
     MatDatepickerModule, MatNativeDateModule],
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.css'
})
export class ProductAddEditComponent {
  productForm = new FormGroup({
    tenSP: new FormControl(''),
    donGia: new FormControl(''),
    soLuong: new FormControl(''),
    ngayNhap: new FormControl(''),
    ngayHetHan: new FormControl('')
  })


  constructor(private productService: ProductService, 
    private dilogRef: MatDialogRef<ProductAddEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.productForm.patchValue(this.data)
  }
  onFormSubmit() {
    if(this.productForm.valid) {
      if(this.data) {
        this.productService.editProduct(this.data.id, this.productForm.value).subscribe({
          next: (val: any) => {
            alert('Update successful product id:' + this.data.id)
            this.dilogRef.close(true);
          }, error: (err: any) => {
            console.log(err)
          }
        })
      } else {      
        this.productService.addProduct(this.productForm.value).subscribe({
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
