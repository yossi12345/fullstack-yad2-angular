import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-form-wrapper',
  templateUrl: './log-form-wrapper.component.html',
  styleUrls: ['./log-form-wrapper.component.scss']
})
export class LogFormWrapperComponent {
  constructor(private router:Router,private location:Location){}
  navigateToPreviousPage(){
    this.location.back()
  }
}
