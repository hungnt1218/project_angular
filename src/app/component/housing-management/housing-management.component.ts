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
import { HouseAddEditComponent } from '../house-add-edit/house-add-edit.component';
import { HousingService } from '../../service/housing.service';
import { HousingLocation } from '../../interface/housinglocation';
import {LiveAnnouncer} from '@angular/cdk/a11y';


@Component({
  selector: 'app-housing-management',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, RouterModule],
  templateUrl: './housing-management.component.html',
  styleUrl: './housing-management.component.css'
})
export class HousingManagementComponent {
  displayedColumns: string[] = ['id', 'name', 'city', 'state', 'photo', 'availableUnits', 'wifi', 'price', 'action'];
  dataSource = new MatTableDataSource<HousingLocation>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public _dialog: MatDialog, private _houseService: HousingService, private _liveAnnouncer: LiveAnnouncer) {}

  openAddHousingForm() {
    const dialogRef = this._dialog.open(HouseAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        this.getHousingList();
      }, error: (err) => {
        alert('fail')
      }
    })
  }

  ngOnInit() {
    this.getHousingList();
  }

  getHousingList() {
    this._houseService.getAllHousing().subscribe({
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
    this._houseService.deleteHouse(id).subscribe({
      next: (res) => {
        alert("Delete Housing id: " + id);
        this.getHousingList();
      }, error: (err) => {
        alert('Delete Fail')
      }
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(HouseAddEditComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        this.getHousingList();
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
