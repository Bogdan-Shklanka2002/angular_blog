import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  submitted: boolean = true;
  form: FormGroup;
  message: string;
  constructor(
    private router: Router, 
    public authService: AuthService,
    private route: ActivatedRoute 
    ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: Params) => {
      if(params['loginAgain']){
        this.message = "Sign in";
      } else if (params['authFiled']){
        this.message = 'Session is finished, sign in please';
      } 
    })
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })

  }

  submit() {
    this.submitted = true;


    if(this.form.invalid){
      return;
    }
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    }
    this.authService.login(user).subscribe(() =>{
      this.form.reset;
      this.router.navigate(['/admin', 'dashboard']);
    })
  }

  logout(event: Event){
    event.preventDefault();
    this.authService.logout();

    this.router.navigate(['/admin', 'login'])
  }

}
