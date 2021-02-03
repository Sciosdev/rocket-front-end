import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { FormControl, Validators } from '@angular/forms';

/**
 * Clase para la autenticación de usuarios definida en @nebular/auth
 */
@Component({
  selector: 'portal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent {
  nameFormControl = new FormControl(localStorage.getItem('remember'), [
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  rememberMeFormControl = new FormControl(false, []);
  /**
   * Método para realizar el inicio de sesión
   */
  login() {
    if (this.rememberMeFormControl.value)
      localStorage.setItem('remember', this.nameFormControl.value);
    else localStorage.removeItem('remember');
    this.user.name = this.nameFormControl.value;
    this.user.password = this.passwordFormControl.value;
    const _this = this;
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.service
      .authenticate(this.strategy, this.user)
      .subscribe(function(result) {
        _this.submitted = false;
        if (result.isSuccess()) {
          _this.messages = result.getMessages();
        } else {
          _this.errors = result.getErrors();
        }
        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(function() {
            return _this.router.navigateByUrl(redirect);
          }, _this.redirectDelay);
        }
        _this.cd.detectChanges();
      });
  }
}
