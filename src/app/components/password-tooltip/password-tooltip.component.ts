import { Component,Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-tooltip',
  templateUrl: './password-tooltip.component.html',
  styleUrls: ['./password-tooltip.component.scss']
})
export class PasswordTooltipComponent {
  @Input() control!:FormControl
  tooltipRegex1=/^.{8,20}$/
  tooltipRegex2=/^(?=.*[a-zA-Z])(?=.*\d).+/
}
