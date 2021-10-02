import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../admin/shared/services/post.service';
import { Post } from '../shared/interfaces';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts: Post[] = [];
  pSub: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts
    });
    console.log(this.posts);
  }

}
