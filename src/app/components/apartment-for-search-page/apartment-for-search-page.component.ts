import { Component, Input,OnInit,OnDestroy } from '@angular/core';
import { APARTMENT_CONDITIONS, getKeyByValue } from 'src/app/Dictionaries';
import { Apartment } from 'src/app/models/Apartment';
import {Subscription} from 'rxjs'
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-apartment-for-search-page',
  templateUrl: './apartment-for-search-page.component.html',
  styleUrls: ['./apartment-for-search-page.component.scss']
})
export class ApartmentForSearchPageComponent implements OnInit, OnDestroy{
  @Input({required:true}) apartment!:Apartment
  @Input() features:string[]=[]
  showPhone:boolean=false
  showDetails:boolean=false
  subscriber!:Subscription
  user!:User|null
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.subscriber=this.authService.user$.subscribe((user)=>{
      this.user=user==="pending"?null:user
    })
  }
  get isUserLikeThisApartment(){
    return this.user?.favoriteApartments?.some(apartment=>apartment.id===this.apartment.id)?true:false
  } 
  getApartmentCondition(conditionNumber:number){
    return getKeyByValue(APARTMENT_CONDITIONS,conditionNumber)
  }
  get mainImagePath(){
    const path=this.apartment.imagesPaths?.find(image=>image.isMain)?.path
    return path?path:'/assets/apartment-without-image.png'
  }
  apartmentHasTheFeature(featureName:string){
    return this.apartment.features?.some(feature=>feature.name===featureName)
  }
  togglePhone(event:Event){
    event.stopPropagation()
    this.showPhone=!this.showPhone
  }
  toggleDetails(){
    this.showDetails=!this.showDetails
  }
  patchUserFavoriteApartments(event:Event){
    event.stopPropagation()
    if (this.isUserLikeThisApartment)
      this.authService.dislikeApartment(this.apartment).subscribe(res=>{
        console.log(res)
      })
    else
      this.authService.likeApartment(this.apartment).subscribe(res=>{
        console.log(res)
      })
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()    
  }
}
