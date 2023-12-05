import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApartmentType } from 'src/app/models/ApartmentType';

@Component({
  selector: 'app-publish-apartment-page',
  templateUrl: './publish-apartment-page.component.html',
  styleUrls: ['./publish-apartment-page.component.scss']
})
export class PublishApartmentPageComponent implements OnInit,OnDestroy{
  subscriber!:Subscription
  features!:string[]
  types!:string[]
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
    this.subscriber=this.route.data.subscribe((res)=>{
      this.types=res['types'].map((type:ApartmentType)=>type.name)
      this.features=res['features']
    })  
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
