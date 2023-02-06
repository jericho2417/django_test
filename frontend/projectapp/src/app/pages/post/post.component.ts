import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
interface Post {
  id: number
  content: string
  created: string

}
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @ViewChild("myForm")
  form!: NgForm;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }
  post = {} as Post;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`http://127.0.0.1:8000/api/post/user/${id}`).subscribe({
      next: data => {
        this.post = data
        console.log(this.post.id)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.put(`http://127.0.0.1:8000/api/post/${id}`, {
      content: this.form.value.content,
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
  delete() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.request('delete', `http://127.0.0.1:8000/api/delete/${id}`)
      .subscribe({
        next: data => {
          this.router.navigate(['/']);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
  }
}
