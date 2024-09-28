import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { RouterModule, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent
} from '@angular/material/dialog';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { CartService } from '../../service/cart.service';
import { CartInfo } from '../../interface/cartInfo';

@Component({
  selector: 'app-cart-management',
  standalone: true,
  imports: [DatePipe, MatCheckboxModule, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, RouterModule],
  templateUrl: './cart-management.component.html',
  styleUrl: './cart-management.component.css'
})
export class CartManagementComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'city', 'photo', 'price', 'quantity', 'user_id', 'date_item', 'action'];
  dataSource = new MatTableDataSource<CartInfo>;
  selection = new SelectionModel<CartInfo>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public _dialog: MatDialog, private _cartService: CartService, private _liveAnnouncer: LiveAnnouncer) {
   
  }

  ngOnInit() {
    this.getCartListItem();
  }

  public userID = localStorage.getItem('id');

  getCartListItem() {
    this._cartService.getCartByUserID(this.userID).subscribe({
      next: (res) => {

        const idQuantityMap = new Map<number, CartInfo>();

        res.forEach((item: CartInfo) => {
          if (idQuantityMap.has(item.id)) {
            // Nếu id đã tồn tại, cộng giá trị quantity
            const existingItem = idQuantityMap.get(item.id)!;
            existingItem.quantity += item.quantity;
          } else {
            // Nếu id chưa tồn tại, thêm vào Map
            idQuantityMap.set(item.id, { ...item });
          }
        });

        // Tạo một mảng mới từ Map
        const resultItems: any[] = Array.from(idQuantityMap.values());
        this.dataSource = new MatTableDataSource(resultItems);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteCart(id: number) {
    this._cartService.deleteCart(id).subscribe({
      next: (res) => {
        alert("Delete Item id: " + id);
        this.getCartListItem();
      }, error: (err) => {
        alert('Delete Fail')
      }
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    let t =this.selection.selected.reduce((acc, item) => {
      return acc + item.price*item.quantity;
    }, 0);
    return t;
  }
  
  onReload() {
    // Reload page
    location.reload();
  }

  buyAll() {
    if(this.logSelection() !== null && this.logSelection() !== undefined && this.logSelection() != 0) {
      for (const item of this.selection.selected) {
        this._cartService.deleteCart(item.id).subscribe({
          next: (res) => {
            console.log("Delete Item id: " + item.id);
            this.onReload();
          }
        })
      }
      alert("Mua hang thanh cong!");
      this.getCartListItem();
    } else {
      alert("Khong co mat hang nao duoc chon")
    }
    
  }

  increaseQuantity(item: CartInfo) {
    item.quantity++;
    return item;
  }

  reduceQuantity(item: CartInfo) {
    item.quantity--;
    if(item.quantity <= 0) {
      item.quantity = 1;
      return item;
    }
    return item;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
