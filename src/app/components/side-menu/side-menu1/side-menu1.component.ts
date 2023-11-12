import { Component } from '@angular/core';
import { itemsForHeader } from 'src/app/constants';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-side-menu1',
  templateUrl: './side-menu1.component.html',
  styleUrls: ['./side-menu1.component.scss']
})
export class SideMenu1Component {
  user!:User|null
  itemsForSelling=itemsForHeader
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.user$.subscribe((user)=>{
      this.user=user==="pending"?null:user 
    })
  }
}
