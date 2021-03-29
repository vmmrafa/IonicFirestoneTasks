import { AuthOptions } from './../../../core/services/auth-options';
import { AuthProvider } from './../../../core/services/auth-provider';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  authProvides = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  name(): FormControl {
    return <FormControl> this.authForm.get('name');
  }

  email(): FormControl {
    return <FormControl> this.authForm.get('email');
  }

  password(): FormControl {
    return <FormControl> this.authForm.get('password');
  }

  changeAuthAction() {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sing Up';
    this.configs.actionChange = isSignIn ? 'Create account' : 'Already have an account';
    !isSignIn
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');
  }

  async onSubmit(provider: AuthProvider) {

    try {
      const credentials = await this.authService.authenticate(
                                                                new AuthOptions(this.configs.isSignIn, provider, new Auth(null, this.email().value, this.password().value))
                                                              );
      console.log('Authenticated: ', credentials);
      console.log('Redirect ');
    }catch(e) {
      console.log('Auth error: ', e);
    }
  }
}
