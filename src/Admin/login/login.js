import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../renderers/bootstrap-form-renderer';
import { AuthService } from '../../services/auth-service';

@inject(ValidationControllerFactory, Router, AuthService)
export class Login
{

  constructor(controllerFactory, router, authService)
  {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.router = router;
    this.authService = authService;
  }


  signin()
  {
    this.controller.validate().then(result =>
    {
      if (result.valid)
      {
        this.authService.logIn(this.username, this.password).then(tokenResult =>
        {
          if (tokenResult.success)
          {
            this.errorMessage = "";
            this.router.navigateToRoute('admin');
          }
          else
          {
            this.errorMessage = tokenResult.message;
          }
        });
      }
    });
  }
}

ValidationRules
  .ensure(a => a.username).displayName('Tên đăng nhập').required().withMessage(`\${$displayName} không được bỏ trống.`)
  .ensure(a => a.password).displayName('Mật khẩu').required().withMessage(`\${$displayName} không được bỏ trống.`)
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/).withMessage(`Mật khẩu từ 8 - 20 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.`)
  .on(Login);
