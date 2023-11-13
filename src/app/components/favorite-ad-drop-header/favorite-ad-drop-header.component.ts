import { Component,OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favorite-ad-drop-header',
  templateUrl: './favorite-ad-drop-header.component.html',
  styleUrls: ['./favorite-ad-drop-header.component.scss']
})
export class FavoriteAdDropHeaderComponent implements OnInit,OnDestroy{
  user!:User|null
  subscriber!:Subscription
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.subscriber=this.authService.user$.subscribe((user)=>{
      this.user=user==="pending"?null:user
    })
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
