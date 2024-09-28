import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../../interface/housinglocation';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../service/cart.service';
import { CartInfo } from '../../interface/cartInfo';


@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housingLocation.photo[0]" alt="Exterior photo of {{housingLocation.name}}">
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p>
      <p class="listing-price">{{ housingLocation.price}}$</p>
      <div class="function">
        <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
        <i class='bx bxs-cart-add' (click)="addItemToCart(housingLocation.id, housingLocation.name, housingLocation.city, housingLocation.photo, housingLocation.price)"></i>
      </div>   
    </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})

export class HousingLocationComponent {

  @Input() housingLocation!: HousingLocation;


  constructor(private cartService: CartService, private router: Router) {}
    
  

  addItemToCart(id: any, name: any, city: any, photo: any, price: any) {
    var cartInfor: any = {
      id: id,
      name: name,
      city: city,
      photo: photo,
      price: price,
      quantity: 1,
      user_id: localStorage.getItem('id'),
      date_item: new Date()
    }
    this.cartService.addCart(cartInfor).subscribe({
      next: (val: any) => {
        this.router.navigate(['/cart']);
      }, error: (err: any) => {
        console.log(err)
      }
    })
  }

  getCartByID(id: any) {
    this.cartService.getCartByID(id).subscribe({
      next: (val: any) => {
      }, error: (err: any) => {
        console.log(err)
      }
    })
  }
}
