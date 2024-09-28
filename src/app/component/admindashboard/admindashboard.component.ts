import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HousingManagementComponent } from '../housing-management/housing-management.component';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [RouterModule, HousingManagementComponent],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {

  isAdmin: boolean = false;

  constructor(private router: Router) {}


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
}
