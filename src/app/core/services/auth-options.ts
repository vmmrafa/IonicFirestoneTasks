import { AuthProvider } from './auth-provider';
import { Auth } from './auth';

export class AuthOptions {

  isSignIn: boolean;
  provider: AuthProvider;
  user: Auth;

  constructor(isSignIn?: boolean, provider?: AuthProvider, user?: Auth) {
    this.isSignIn = isSignIn;
    this.provider = provider;
    this.user = user;
  }
}
