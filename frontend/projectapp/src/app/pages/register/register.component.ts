import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild("myForm")
  form!: NgForm;
  constructor(private http: HttpClient, private router: Router) {
  }
  onSubmit() {
    this.http.post('http://127.0.0.1:8000/api/register', {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      password: this.form.value.password,
      password_confirm: this.form.value.confirm_password,
    }).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      error: (error) => console.log(error),
    });
  }
}
