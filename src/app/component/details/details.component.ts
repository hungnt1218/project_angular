import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../service/housing.service';
import { HousingLocation } from '../../interface/housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { HousingLocationComponent } from '../housing-location/housing-location.component';

@Component({
  selector: 'app-details',
  standalone: true,
  providers: [HousingLocationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    HousingLocationComponent,
    RouterModule
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocate = inject(HousingLocationComponent);
  housingLocation: any;
  filteredImageList: any[] = [];
  currentIndexImage = 0;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = this.route.snapshot.params['id'];
    this.housingService.getHousingById(housingLocationId).subscribe(housingLocation => {
      this.housingLocation = housingLocation;
      this.filteredImageList = housingLocation.photo;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

  thumnailImage(url: any) {
    let index: any = this.indexImageInList(url);
    this.currentIndexImage = index;
  }

  indexImageInList(imageUrl: any) {
    for (let i = 0; i < this.filteredImageList.length; i++) {
      if (imageUrl === this.filteredImageList[i]) {
        this.currentIndexImage = i
      }
    }
    return this.currentIndexImage;
  }  
}
