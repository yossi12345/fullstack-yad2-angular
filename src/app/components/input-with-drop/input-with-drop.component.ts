import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-with-drop',
  templateUrl: './input-with-drop.component.html',
  styleUrls: ['./input-with-drop.component.scss']
})
export class InputWithDropComponent {
  @Input() dropContent!:(string|number)[]
  @Input() placeholder:string=""
  @Input() inputWidth:string="123px"
  @Input() dropMaxHeight:string="320px"
  @Input() inputValue:string|number|null=null
  @Output() choose=new EventEmitter()
  onClick(value:string|number){
    this.choose.emit(value)
  }
}
