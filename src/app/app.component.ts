import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HousingManagementComponent } from './component/housing-management/housing-management.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterLink,
    RouterOutlet,
    HttpClientModule
  ],
  template: `
  <main>
    <a>
      <header class="brand-name">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40px" height="40px" viewBox="0,0,256,256" [routerLink]="['/']">
      <g transform="translate(25.6,25.6) scale(0.8,0.8)"><g fill="#66ff99" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(9.84615,9.84615)"><path d="M20,2.03125c-0.55078,0 -1,0.44922 -1,1v4.78125l-5.28125,-5.28125c-0.39062,-0.39062 -1.04687,-0.39062 -1.4375,0l-11.71875,11.75c-0.39062,0.39063 -0.39062,1.01563 0,1.40625c0.39063,0.39063 1.01563,0.39063 1.40625,0l11.03125,-11.03125l11.0625,11.0625c0.19531,0.19531 0.46094,0.3125 0.71875,0.3125c0.25781,0 0.49219,-0.11719 0.6875,-0.3125c0.39063,-0.39062 0.39063,-1.01562 0,-1.40625l-3.46875,-3.46875v-7.8125c0,-0.55078 -0.44922,-1 -1,-1zM13,6.5l-11,11v5.5c0,1.65625 1.34375,3 3,3h16c1.65625,0 3,-1.34375 3,-3v-5.5zM11,16h4c0.55078,0 1,0.44922 1,1v6c0,0.55078 -0.44922,1 -1,1h-4c-0.55078,0 -1,-0.44922 -1,-1v-6c0,-0.55078 0.44922,-1 1,-1z"></path></g></g></g>
      </svg>
      </header>
    </a>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Homes';
  public isLoggedIn$: Observable<boolean> = new Observable<boolean>;

  isLoggedIn1 = false;
  isAdmin = false;

  constructor(private router: Router) {}

  // ngOnInit() {
  //   const userId = localStorage.getItem('id');
  //   if (userId) {
  //     this.isLoggedIn1 = true;
  //   } else {
  //     // Người dùng chưa đăng nhập
  //     this.router.navigate(['/login']);
  //   }
  // }
}
