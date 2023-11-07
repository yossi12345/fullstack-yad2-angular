import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit{
  showPassword:boolean=false
  signInForm!:FormGroup
  showMailError:boolean=false
  showPasswordError:boolean=false
  constructor(private fb:FormBuilder,private router:Router){}
  ngOnInit(): void {
    this.signInForm=this.fb.group({
      mail:['',[
        Validators.required,
        Validators.email
      ]],
      password:['',[
        Validators.required,
      ]]
    })
  }
  getMailError(){
    const control=this.getControl("mail")
    if (control.hasError("required"))
      return "לא לשכוח את המייל"
    if (control.hasError("email"))
      return "משהו לא תקין במייל, אולי התפספס @?"
    return ""
  }
  getPasswordError(){
    const control=this.getControl("password")
    if (control.hasError("required"))
      return "לא לשכוח להזין סיסמה"
    return ""
  }
  togglePassword(){
    this.showPassword=!this.showPassword
  }
  clearMailInput(){
    this.getControl("mail").setValue("")
  }
  getControl(name:"mail"|"password"){
    return this.signInForm.get(name) as FormControl
  }
  hideError(name:"password"|"mail"){
    if (name==="mail")
      this.showMailError=false
    else
      this.showPasswordError=false
  }
}
