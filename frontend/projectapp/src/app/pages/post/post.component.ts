import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
}
