import { Component ,Input,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-eye-icon-for-pasword-input',
  templateUrl: './eye-icon-for-pasword-input.component.html',
  styleUrls: ['./eye-icon-for-pasword-input.component.scss']
})
export class EyeIconForPaswordInputComponent {
  @Input() isRegularEye!:boolean
  @Output() eyeClick=new EventEmitter()
  onClick(){
    this.isRegularEye=!this.isRegularEye
    console.log(this.isRegularEye)
    this.eyeClick.emit(this.isRegularEye)
  }
}
