import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { UserApi } from '../../services/user-api'
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../renderers/bootstrap-form-renderer';

@inject(UserApi, ValidationControllerFactory, EventAggregator)

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

  constructor(userApi, controllerFactory, eventAggregator)
  {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.userApi = userApi;
    this.eventAggregator = eventAggregator;
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
          this.eventAggregator.publish('userInfo', { userInfo: fetchedUser });
        });

      }
    });
  }

}
