import { inject } from 'aurelia-framework';
import { UserApi } from '../../services/user-api'
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../renderers/bootstrap-form-renderer';

@inject(UserApi, ValidationControllerFactory)
export class EditUser
{
  // rules = ValidationRules
  //   .ensure('password').required().withMessage(`Mật khẩu cũ không được bỏ trống.`)
  //   .rules;

  constructor(userApi, controllerFactory)
  {
    this.userApi = userApi;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  activate(params)
  {
    this.loadUser(params.id);
  }

  loadUser(id)
  {
    this.userApi.getUserById(id).then(fetchedUser =>
    {
      this.user = fetchedUser;
    });
  }

}
