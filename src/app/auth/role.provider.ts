import { Injectable } from '@angular/core';

import { NbAuthService, NbAuthJWTToken, NbAuthOAuth2JWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthOAuth2JWTToken) => {
          console.log(token);
          return token.isValid() ? token.getAccessTokenPayload()['authorities'] : 'guest';
        }),
      );
  }
}