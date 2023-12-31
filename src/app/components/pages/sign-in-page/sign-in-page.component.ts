import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  showLoginFailError:boolean=false
  isPending:boolean=false
  pageToNavigateAfterSignIn?:string
  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.pageToNavigateAfterSignIn=params['navigateTo']
    })
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
    this.showLoginFailError=false
  }
  handleSubmit(){
    if (this.signInForm.invalid){
      this.showMailError=true
      this.showPasswordError=true
      return 
    }
    this.isPending=true
    this.showLoginFailError=false
    const mail=this.getControl("mail").value
    const password=this.getControl("password").value
    this.authService.signIn(mail,password).subscribe((res)=>{
      if (!res)
        this.showLoginFailError=true
      else
        this.router.navigate([this.pageToNavigateAfterSignIn?this.pageToNavigateAfterSignIn:"/"],{replaceUrl:true})
      this.isPending=false
    })

  }
}
