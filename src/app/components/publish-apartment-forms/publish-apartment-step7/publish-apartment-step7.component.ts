import { Component, OnInit } from '@angular/core';
import { APARTMENT_ADS_TYPES, getKeyByValue } from 'src/app/Dictionaries';
import { PublishApartmentService } from 'src/app/services/publish-apartment.service';

@Component({
  selector: 'app-publish-apartment-step7',
  templateUrl: './publish-apartment-step7.component.html',
  styleUrls: ['./publish-apartment-step7.component.scss']
})
export class PublishApartmentStep7Component implements OnInit{
  summary:string=""
  adTypes=Object.keys(APARTMENT_ADS_TYPES)
  choosedAd:string=this.adTypes[2]
  constructor(private publishService:PublishApartmentService){}
  ngOnInit(): void {
    const data:any=this.publishService.getStepData(7)
    if (data)
      this.choosedAd=getKeyByValue(APARTMENT_ADS_TYPES,data.adType) as string
  }
  onChoosed(adType:string){
    this.choosedAd=adType
  }
  onSubmit(){
    this.publishService.onSubmitStep(7,{adType:APARTMENT_ADS_TYPES[this.choosedAd]})
  }
}
