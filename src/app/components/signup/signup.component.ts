import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  loadingBtn:boolean = false;
  errorMsg:string = '';
  signUpForm: FormGroup = this._FormBuilder.group({
    name:[null , [Validators.required , Validators.minLength(3)]],
    email:[null , [Validators.required , Validators.email]],
    password:[null , [Validators.required , Validators.pattern(/^[a-zA-Z0-9]{4,}$/)]],
    age:[null , [Validators.required , Validators.min(20), Validators.pattern(/^[0-9]*$/)]],
    phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]
  });

  submit():void{
    if(this.signUpForm.valid)
    {
      this.loadingBtn = true;
      this._AuthService.signUp(this.signUpForm.value).subscribe({
        next:(res)=>{
          this.loadingBtn = false;
          this.errorMsg = res.msg;
          this._Router.navigate(['/login'])
        },
        error:(err:HttpErrorResponse)=>{
          this.errorMsg = err.error.msg;
          this.loadingBtn = false;
        }
      })
      
    }
  }
}
