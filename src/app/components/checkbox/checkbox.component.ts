import { Component,ElementRef,EventEmitter,Input,Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() label?:string
  @Input() labelAsParts?:{beforeATag?:string,aTag:string,afterATag?:string}
  @Input() url?:string
  @Output() onChange=new EventEmitter()
  @Input() isChecked:boolean=false
  @Input() needToChange:boolean=false
  @Input() fontSize:string='16px'
  constructor(private router:Router){}
  onClick(){
    this.onChange.emit(this.isChecked)
    if (this.needToChange)
      this.isChecked=!this.isChecked
  }
  navigateToUrl(){
    if (this.url)
      this.router.navigate([this.url])  
  }
}
