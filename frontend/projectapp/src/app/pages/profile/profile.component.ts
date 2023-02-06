import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
interface Profile {
  id: number
  first_name: string
  last_name: string
  email: string

}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @ViewChild("myForm")
  form!: NgForm;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }
  profile = {} as Profile;
  ngOnInit() {
    const id = localStorage.getItem('id')
    this.http.get<any>(`http://127.0.0.1:8000/api/user/details/${id}`).subscribe({
      next: data => {
        this.profile = data
        console.log(localStorage.getItem('id'))
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
  onSubmit() {
    const id = localStorage.getItem('id')
    this.http.put(`http://127.0.0.1:8000/api/user/details/${id}`, {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      password: this.form.value.password,
    }).subscribe({
      next: (response: any) => {
        console.log(response)
        this.ngOnInit()
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
