import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  onSubmit() {
    this.http.post('http://127.0.0.1:8000/api/login', {
      email: this.form.value.email,
      password: this.form.value.password,
    }).subscribe({
      next: (response: any) => {
        console.log(response.token);
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
