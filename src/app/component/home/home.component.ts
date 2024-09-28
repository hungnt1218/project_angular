import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../../interface/housinglocation';
import { HousingService } from '../../service/housing.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HousingLocationComponent,
    AdmindashboardComponent,
  ],
  template: `
  <section>
    <form>
      <div class="navbar">
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </div>
      <a class="admin_dashboard" [routerLink]="['/admin']">Admin Dashboard</a>
      <div>
        <i class='bx bxs-cart' [routerLink]="['/cart']"></i>
        <i class='bx bxs-log-out' (click)="logOut()"></i>
      </div> 
    </form>
  </section>
  <section class="results">
  <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
  </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  isAdmin = false;

  constructor(private router: Router) {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  // ngOnInit() {
  //   const userRole = localStorage.getItem('role');
  //   if (userRole == "ADMIN") {
  //     this.isAdmin = true;
  //   } else {
  //     // Người dùng chưa đăng nhập
  //     this.router.navigate(['']);
  //   }
  // }

  logOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
