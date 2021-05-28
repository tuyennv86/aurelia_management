import { bindable, inject, computedFrom, NewInstance } from 'aurelia-framework';
import { UserApi } from '../../services/user-api'
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../renderers/bootstrap-form-renderer';

@inject(UserApi, ValidationControllerFactory)

export class EditProfile
{
  @bindable message;
  @bindable user;

  rules = ValidationRules
    .ensure('fullname').required().withMessage('Họ tên không được để trống')
    .ensure('email').required().withMessage('Email không được bỏ trống')
    .email().withMessage('Email sai định dạng')
    .ensure('phone').required().withMessage('Điện thoại không được bỏ trống')
    .rules;

  constructor(userApi, controllerFactory)
  {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.userApi = userApi;
  }

  updateInfo()
  {
    this.controller.validate().then(result =>
    {
      if (result.valid)
      {
        this.userApi.updateInfo(this.user).then(fetchedUser =>
        {

          this.message = 'Cập nhật thành công !';
          this.user = fetchedUser;
          this.eventAggregator.publish('userInfo', { user: fetchedUser });
        });

      }
    });
  }

}
