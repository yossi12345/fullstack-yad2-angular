import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-ads-banner',
  templateUrl: './ads-banner.component.html',
  styleUrls: ['./ads-banner.component.scss']
})
export class AdsBannerComponent implements OnInit,OnDestroy{
  subscriber!:Subscription
  showIndex:1|2=1
  ngOnInit(): void {
    const source=interval(2000)
    this.subscriber=source.subscribe(()=>{
     // this.showIndex=this.showIndex==1?2:1
    })
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
