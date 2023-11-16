import { Component } from '@angular/core';
import { Item, items } from './items';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish-page',
  templateUrl: './publish-page.component.html',
  styleUrls: ['./publish-page.component.scss']
})
export class PublishPageComponent {
  items=items
  subscriber!:Subscription
  user!:User|null
  showModal:boolean=false
  showDrop:boolean=false
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.subscriber=this.authService.user$.subscribe(user=>{
      this.user=user==="pending"?null:user
    })
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
  changeIconSrc(item:Item,isMouseEnter:boolean){
    item.imageToShow=isMouseEnter?item.imageOnHover:item.image
  }
  openModal(){
    this.showModal=true
  }
  closeModal(){
    this.showModal=false
  }
  stopPropagation(event:Event){
    event.stopPropagation()
  }
  toggleDrop(){
    this.showDrop=!this.showDrop
  }
  signOut(){
    this.authService.signOut()
    this.router.navigate(['sign-in'])
  }
  signInAsOtherUser(){
    this.authService.signOut()
    this.router.navigate(['sign-in?navigateTo=publish'])
  }
}
