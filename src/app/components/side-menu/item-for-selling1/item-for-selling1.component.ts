import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-for-selling1',
  templateUrl: './item-for-selling1.component.html',
  styleUrls: ['./item-for-selling1.component.scss']
})
export class ItemForSelling1Component {
  @Input() itemName!:string
  @Input() iconName!:string
  showLinks:boolean=false
  @Input() links!:{name:string,url?:string}[]
  constructor(private router:Router){}
  navigate(link:{name:string,url?:string}){
    if (link.url)
      this.router.navigate([link.url])
  }
  openLinks(){
    this.showLinks=true
  }
  closeLinks(){
    this.showLinks=false
  }
}
