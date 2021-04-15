import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { OverlayService } from './../../../core/services/overlay.service';
import { AuthOptions } from './../../../core/services/auth-options';
import { AuthProvider } from './../../../core/services/auth-provider';
import { AuthService } from './../../../core/services/auth.service';
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

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private route: ActivatedRoute,
    private overlayService: OverlayService) { }

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
    return <FormControl>this.authForm.get('name');
  }

  email(): FormControl {
    return <FormControl>this.authForm.get('email');
  }

  password(): FormControl {
    return <FormControl>this.authForm.get('password');
  }

  changeAuthAction() {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sing Up';
    this.configs.actionChange = isSignIn ? 'Create account' : 'Already have an account';
    !isSignIn
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');

      console.log(!isSignIn);
    console.log(this.authForm.value);
  }

  async onSubmit(provider: AuthProvider) {
    const loading = await this.overlayService.loading();

    try {
      let isRegisteredUser = this.configs.isSignIn;
      const credentials = await this.authService.authenticate(
        new AuthOptions(isRegisteredUser, provider,
                          new Auth((isRegisteredUser) ? null : this.name().value, this.email().value, this.password().value))
      );

      this.navController.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/tasks');
    } catch (e) {
      console.log('Auth error: ', e);
      await this.overlayService.toast({
        message: e.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
