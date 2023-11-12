import { Component, OnInit } from '@angular/core';
import { itemsForHeader } from 'src/app/constants';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  user!:User|null
  itemsForSelling=itemsForHeader
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.user$.subscribe((user)=>{
      this.user=user==="pending"?null:user 
    })
  }
}
