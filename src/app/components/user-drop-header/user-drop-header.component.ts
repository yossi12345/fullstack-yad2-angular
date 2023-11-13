import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-drop-header',
  templateUrl: './user-drop-header.component.html',
  styleUrls: ['./user-drop-header.component.scss']
})
export class UserDropHeaderComponent implements OnInit,OnDestroy{
  user!:User|null
  subscriber!:Subscription
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.subscriber=this.authService.user$.subscribe((user)=>{
      this.user=user==="pending"?null:user
    })
  }
  signOut(){
    this.authService.signOut()
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
