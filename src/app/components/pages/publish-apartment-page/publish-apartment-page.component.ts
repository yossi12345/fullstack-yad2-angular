import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publish-apartment-page',
  templateUrl: './publish-apartment-page.component.html',
  styleUrls: ['./publish-apartment-page.component.scss']
})
export class PublishApartmentPageComponent implements OnInit,OnDestroy{
  subscriber!:Subscription

  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
    this.subscriber=this.route.data.subscribe((res)=>{
      console.log(res['features'],res['types'])
    })  
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
