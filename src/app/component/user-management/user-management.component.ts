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
import { UserInfo } from '../../interface/userinfo';
import { UserService } from '../../service/user.service';
import { UserAddEditComponent } from '../user-add-edit/user-add-edit.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, RouterModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  displayedColumns: string[] = ['id', 'name', 'age', 'username', 'password', 'role', 'action'];
  dataSource = new MatTableDataSource<UserInfo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public _dialog: MatDialog, private _userService: UserService, private _liveAnnouncer: LiveAnnouncer) {}

  openAddUserForm() {
    const dialogRef = this._dialog.open(UserAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        this.getUserList();
      }, error: (err) => {
        alert('fail')
      }
    })
  }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this._userService.getAllUser().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteHosusing(id: number) {
    this._userService.deleteUser(id).subscribe({
      next: (res) => {
        alert("Delete User id: " + id);
        this.getUserList();
      }, error: (err) => {
        alert('Delete Fail')
      }
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(UserAddEditComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if(res) {
          this.getUserList();
        }
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
