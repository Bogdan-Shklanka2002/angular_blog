import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from '../shared/services/post.service';


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;
  submitted: Boolean;
  constructor(
    private postService: PostService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),

    })
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.submitted = false
      return
    }
    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    }

    this.submitted = true;

    this.postService.create(post).subscribe(() => {
      this.submitted = false;
      this.form.reset;
      this.router.navigate(['/admin', 'dashboard'])
    }, () => {
      this.submitted = false;

    });
  }

}
