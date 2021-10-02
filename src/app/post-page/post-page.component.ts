import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../admin/shared/services/post.service';
import { Post } from '../shared/interfaces';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  @Input() post_id: string;
  post: Post;
  pSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params["id"])
      })

    ).subscribe((post: Post) => {
      this.post = post;
    })
    
  }

}
