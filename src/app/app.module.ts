import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogFormWrapperComponent } from './components/log-form-wrapper/log-form-wrapper.component';
import { SignUpPart1PageComponent } from './components/pages/sign-up-part1-page/sign-up-part1-page.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EyeIconForPaswordInputComponent } from './components/eye-icon-for-pasword-input/eye-icon-for-pasword-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LogFormWrapperComponent,
    SignUpPart1PageComponent,
    PasswordInputComponent,
    EyeIconForPaswordInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
