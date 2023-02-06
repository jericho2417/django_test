import { Component, ContentChild, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

interface Post {
  id: number
  content: string
  created: string

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  @ViewChild("myForm")
  form!: NgForm;
  PostObjects: Post[] = [];
  constructor(private http: HttpClient, private router: Router) {
  }
  ngOnInit() {
    this.http.get<any>('http://127.0.0.1:8000/api/post').subscribe({
      next: data => {
        this.PostObjects = data
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
  onSubmit() {
    this.http.post('http://127.0.0.1:8000/api/post', {
      content: this.form.value.content,
    }).subscribe({
      next: (response: any) => {
        console.log(response)
        this.ngOnInit()
      },
      error: (error) => {
        console.log(error)
        this.router.navigate(['/login']);
        ;
      },
    });
  }
}
