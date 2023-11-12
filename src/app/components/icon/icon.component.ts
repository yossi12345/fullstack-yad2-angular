import { Component,Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnChanges{
  @Input() name!:string
  @Input() color?:string
  @Input() width?:string
  @Input() height?:string
  style!:{height?:string,width?:string,fill?:string}
  ngOnChanges(){
    this.style={
      height:this.height,
      width:this.width,
      fill:this.color,
    }
  }
}
