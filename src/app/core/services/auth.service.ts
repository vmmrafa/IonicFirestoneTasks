import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/auth';

import { AuthOptions } from './auth-options';
import { AuthProvider } from './auth-provider';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.authState$ = this.afAuth.authState;
   }

   get isAuthenticated(): Observable<boolean> {
     return this.authState$.pipe(map(user => user !== null));
   }

  authenticate(options: AuthOptions): Promise<firebase.auth.UserCredential> {
    let operation: Promise<firebase.auth.UserCredential>;

    if (options.provider !== AuthProvider.Email) {
      operation = this.singInwithPopup(options.provider);
    } else {
      operation = options.isSignIn ? this.signInWithEmailAndPassword(options.user) : this.signUpWithEmailAndPassword(options.user);
    }

    return operation;
  }

  logout() {
    return this.afAuth.signOut();
  }

  private signInWithEmailAndPassword(authCredential: Auth): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(authCredential.getEmail(), authCredential.getPassword());
  }

  private signUpWithEmailAndPassword(authCredential: Auth): Promise<firebase.auth.UserCredential> {
    return this.afAuth
      .createUserWithEmailAndPassword(authCredential.getEmail(), authCredential.getPassword())
      .then(credentials =>
        credentials.user
          .updateProfile({ displayName: authCredential.getName(), photoURL: null })
          .then(() => credentials)
      );
  }

  private singInwithPopup(provider: AuthProvider): Promise<firebase.auth.UserCredential> {
    let singInProvider = null;

    switch (provider) {
      case AuthProvider.Facebook:
        singInProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case AuthProvider.Google:
        singInProvider = new firebase.auth.GithubAuthProvider();
        break;
    }

    return this.afAuth.signInWithPopup(singInProvider);
  }
}
