import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  loadingBtn:boolean = false;
  errorMsg:string = '';
  loginForm: FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email]],
    password:[null , [Validators.required ]]
  });

  submit():void{
    if(this.loginForm.valid)
    {
      this.loadingBtn = true;
      this._AuthService.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.loadingBtn = false;
          this.errorMsg = res.msg;
          localStorage.setItem('tokenToDo' , res.token)
          this._Router.navigate(['/home'])
        },
        error:(err:HttpErrorResponse)=>{
          this.errorMsg = err.error.msg;
          this.loadingBtn = false;
        }
      })
      
    }
  }
}
