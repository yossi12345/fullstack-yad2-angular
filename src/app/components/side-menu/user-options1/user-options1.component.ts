import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-options1',
  templateUrl: './user-options1.component.html',
  styleUrls: ['./user-options1.component.scss']
})
export class UserOptions1Component {
  user!:User|null
  subscriber!:Subscription
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.subscriber=this.authService.user$.subscribe((user)=>{
      this.user=user==="pending"?null:user
    })
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
  navigateToSignIn(){
    this.router.navigate(['sign-in'])
  }
}
