import { inject } from 'aurelia-framework';
import { UserApi } from '../../services/user-api'
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../renderers/bootstrap-form-renderer';

@inject(UserApi, ValidationControllerFactory)
export class EditUser
{
  rules = ValidationRules
    .ensure('fullname').required().withMessage('Họ tên không được để trống')
    .ensure('email').required().withMessage('Email không được bỏ trống')
    .email().withMessage('Email sai định dạng')
    .ensure('phone').required().withMessage('Điện thoại không được bỏ trống')
    .rules;

  constructor(userApi, controllerFactory)
  {
    this.message = "";
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

  updateuser()
  {
    this.controller.validate().then(result =>
    {
      if (result.valid)
      {
        if (this.files)
        {
          this.userApi.saveUser(this.user, this.files[0]).then(fetchedUser =>
          {
            this.user = fetchedUser;
            this.message = "Cập nhật thành công !";
          });
        } else
        {
          this.userApi.saveUserNoImage(this.user).then(fetchedUser =>
          {
            this.user = fetchedUser;
            this.message = "Cập nhật thành công !";
          });
        }
      }
    });
  }

}
