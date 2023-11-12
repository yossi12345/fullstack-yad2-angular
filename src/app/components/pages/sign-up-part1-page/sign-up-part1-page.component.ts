import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sign-up-part1-page',
  templateUrl: './sign-up-part1-page.component.html',
  styleUrls: ['./sign-up-part1-page.component.scss']
})
export class SignUpPart1PageComponent implements OnInit{
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router){}
  signUpPart1!:FormGroup
  showPassword:boolean=false
  showPasswordError:boolean=false
  showMailError:boolean=false
  showUniqueMailError=false
  isPending:boolean=false
  ngOnInit(): void {
    const mail=sessionStorage.getItem('mail')
    const password=sessionStorage.getItem('password')
    this.signUpPart1=this.fb.group({
      mail:[mail?mail:'',[
        Validators.required,
        Validators.email
      ]],
      password:[password?password:'',[
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])[\w!@#$%^&*]*$/)
      ]],
      repeatPassword:['',[
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])[\w!@#$%^&*]*$/)
      ]]
    })
   
  }
  getMailError(){
    const control=this.getControl("mail")
    if (control.hasError("required"))
      return "לא לשכוח את המייל"
    else if (control.hasError("email"))
      return "משהו לא תקין במייל, אולי התפספס @?"
    return ""
  }
  getPasswordError(){
    const passwordControl=this.getControl("password")
    const repeatedPasswordControl=this.getControl("repeatPassword")
    if (passwordControl.getError("required"))
      return "לא לשכוח להזין סיסמה"
    if (passwordControl.getError("pattern")||repeatedPasswordControl.getError("pattern"))
      return "נבקש שהסיסמה תכלול אותיות באנגלית וספרות"
    if (passwordControl.getError("maxLength")||passwordControl.getError("minLength"))
      return "נבקש סיסמה באורך 8-20 תווים"
    if (passwordControl.value!==repeatedPasswordControl.value)
      return "הסיסמאות לא זהות"
    return ""
  }
  getControl(name:"password"|"mail"|"repeatPassword"){
    return this.signUpPart1.get(name) as FormControl
  }
  togglePassword(){
    this.showPassword=!this.showPassword
  }
  hideError(name:"password"|"mail"){
    this.showUniqueMailError=false
    if (name==="password")
      this.showPasswordError=false
    else
      this.showMailError=false
  }
  clearMailInput(){
    this.getControl("mail").setValue("")
  }
  handleSubmit(){
    const mailControl=this.getControl("mail")
    const passwordControl=this.getControl("password")
    const repeatPasswordControl=this.getControl("repeatPassword")
    if (this.signUpPart1.invalid||passwordControl.value!==repeatPasswordControl.value){
      this.showPasswordError=true
      this.showMailError=true
      return 
    }
    sessionStorage.setItem("mail",mailControl.value)
    sessionStorage.setItem('password',passwordControl.value)
    this.showUniqueMailError=false
    this.isPending=true
    this.authService.isEmailAlreadyExist(mailControl.value).subscribe((isEmailExist)=>{
      if (isEmailExist)
        this.showUniqueMailError=true
      else {
        //send validation mail code 
        this.router.navigate(['sign-up2'])
      }
      this.isPending=false
      console.log("sub",isEmailExist)
    })
  }
}
