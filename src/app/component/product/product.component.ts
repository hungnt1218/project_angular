import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { RouterModule, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent
} from '@angular/material/dialog';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ProductService } from '../../service/product.service';
import { SanPham } from '../../interface/product';
import { ProductAddEditComponent } from '../product-add-edit/product-add-edit.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  displayedColumns: string[] = ['id', 'tenSP', 'donGia', 'soLuong', 'ngayNhap', 'ngayHetHan', 'action'];
  dataSource = new MatTableDataSource<SanPham>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public _dialog: MatDialog, private _productService: ProductService, private _liveAnnouncer: LiveAnnouncer) {}

  openAddProductForm() {
    const dialogRef = this._dialog.open(ProductAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        this.getProductList();
      }, error: (err) => {
        alert('fail')
      }
    })
  }


  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this._productService.getAllProduct(this.paginator, 60).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res)
        console.log(this.paginator)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onReload() {
    // Reload page
    location.reload();
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe({
      next: (res) => {
        alert("Delete Product id: " + id);
        this.getProductList();
        this.onReload();
      }, error: (err) => {
        alert('Delete Fail')
      }
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ProductAddEditComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        this.getProductList();
        this.onReload();
      }, error: (err) => {
        alert('fail')
      }
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
