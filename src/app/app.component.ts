import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pages: { url: string, direction: string, icon: string, text: string }[];
  user: firebase.default.User;

  constructor(private authService :AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.pages = [
      { url: '/tasks', direction: 'back', icon: 'checkmark', text: 'Tasks' },
      { url: '/tasks/create', direction: 'forward', icon: 'add', text: 'New Task' }
    ];

    this.authService.authState$.subscribe(user => { this.user = user; console.log(this.user)});
  }
}
