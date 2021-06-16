import { inject } from 'aurelia-framework';
import { UserApi } from '../../services/user-api'
import { EventAggregator } from 'aurelia-event-aggregator';
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../renderers/bootstrap-form-renderer';

@inject(UserApi, ValidationControllerFactory, EventAggregator)
export class Profile
{

  rules = ValidationRules
    .ensure('password').required().withMessage(`Mật khẩu cũ không được bỏ trống.`)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/).withMessage(`Mật khẩu từ 8 - 20 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.`)
    .ensure('newPassword').required().withMessage(`Mật khẩu mới không được bỏ trống.`)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/).withMessage(`Mật khẩu từ 8 - 20 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.`)
    .ensure('confirmPassword').required().withMessage(`Nhập lại mật khẩu mới không được bỏ trống.`)
    .satisfiesRule('matchesProperty', 'newPassword').withMessage('Mật khẩu không trùng nhau')
    .rules;

  constructor(userApi, controllerFactory, eventAggregator)
  {
    this.messageSucc = '';
    this.messageErr = '';
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.userApi = userApi;
    this.eventAggregator = eventAggregator;

    this.messageInfo = this.eventAggregator.subscribe('userInfo', s =>
    {
      this.user = s.userInfo;
    });

  }

  activate(params)
  {
    this.loadUser(params.username);
  }

  loadUser(name)
  {
    this.userApi.getUser(name).then(fetchedUser =>
    {
      this.user = fetchedUser;
    });
  }

  changPass()
  {
    this.controller.validate().then(result =>
    {
      if (result.valid)
      {
        const userchang = {
          username: this.user.username,
          password: this.password,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword
        }

        this.userApi.changPass(userchang).then(fetchedUser =>
        {
          console.log(fetchedUser);
          // this.user = fetchedUser;
          if (fetchedUser.statusCode === 409)
          {
            this.messageErr = fetchedUser.message;
            this.messageSucc = '';
          } else
          {
            this.messageErr = '';
            this.messageSucc = "Cập nhật thành công!";
          }
        })
        // console.log('jghjgh');
      }
    });
  }

  fileSelected()
  {
    this.userApi.updateImageProfile(this.user.id, this.files[0]).then(fetchUser =>
    {
      this.user = fetchUser;
    });

  }

}
ValidationRules.customRule(
  'matchesProperty',
  (value, obj, otherPropertyName) =>
    value === null
    || value === undefined
    || value === ''
    || obj[otherPropertyName] === null
    || obj[otherPropertyName] === undefined
    || obj[otherPropertyName] === ''
    || value === obj[otherPropertyName],
  '${$displayName} must match ${$getDisplayName($config.otherPropertyName)}',
  otherPropertyName => ({ otherPropertyName })
);
