import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild("myForm")
  form!: NgForm;
  constructor(private http: HttpClient, private router: Router) {
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  onSubmit() {
    this.http.post('http://127.0.0.1:8000/api/login', {
      email: this.form.value.email,
      password: this.form.value.password,
    }).subscribe({
      next: (response: any) => {
        const tokenInfo = this.getDecodedAccessToken(response.token); // decode token
        console.log(tokenInfo);
        localStorage.setItem('id', tokenInfo.user_id);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error)
        this.router.navigate(['/login']);
        ;
      },
    });
  }
}
