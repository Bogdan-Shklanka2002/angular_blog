import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from '../shared/services/post.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  posts: Post[] =[];
  pSub: Subscription;
  dSub: Subscription;
  search: string = " ";
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts
    });
  }

  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe();
    }
    if(this.dSub){
      this.dSub.unsubscribe();
    }
  }
  remove(id: string){
    this.dSub = this.postService.remove(id).subscribe(posts =>{
      this.posts = this.posts.filter(post =>{ return post.id !== id });
    })
  }

  
}
