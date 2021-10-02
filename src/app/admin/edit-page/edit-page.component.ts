import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../shared/services/post.service';
import { Post } from 'src/app/shared/interfaces';
import { ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  uSub: Subscription;
  post: Post;

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
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
        author: new FormControl(post.author, Validators.required)
      })
    })
  }

  submit() {
    if (this.form.invalid){
      return;
    }
    this.submitted = true;
    this.uSub = this.postService.update({
      ...this.post,
        text: this.form.value.text,
        title: this.form.value.title,
        author: this.form.value.author
    }).subscribe( () => {
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard']);
    })
  }

  ngOnDestroy(){
    if(this.uSub){
      this.uSub.unsubscribe();
    }
  }

}
