import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {
  @Input() shouldOpenMenu:boolean=false
  @Input() closeBtnColor:string="#484848"
  @Input() closeBtnSize:number=16
  @Input() menuWidth!:string
  subscriber!:Subscription
  user!:User|null
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.subscriber=this.authService.user$.subscribe((user)=>{
      this.user=user!=="pending"?user:null
    })
  }
  toggleMenu(){
    this.shouldOpenMenu=!this.shouldOpenMenu
  }
  stopPropagation(event:Event){
    event.stopPropagation()
  }
  signOut(){
    this.authService.signOut()
    this.toggleMenu()
  }
  ngOnDestroy(){
    this.subscriber.unsubscribe()
  }
}
