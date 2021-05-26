import { inject } from 'aurelia-framework';
import { UserApi } from '../../services/user-api'
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../renderers/bootstrap-form-renderer';

@inject(UserApi, ValidationControllerFactory)
export class Profile
{
  // rules = ValidationRules
  //   .ensure(a => a.password).required()
  //   .ensure(a => a.passnew).required()
  //   .ensure(a => a.passnewpre).required()
  //   .rules;

  constructor(userApi, controllerFactory)
  {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.userApi = userApi;
  }

  activate(params, routeConfig)
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
    this.controller.validate();
  }
  updateInfo()
  {
    this.controller.validate();
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

ValidationRules
  .ensure(a => a.password).required().withMessage(`Mật khẩu cũ không được bỏ trống.`)
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/).withMessage(`Mật khẩu từ 8 - 20 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.`)
  .ensure(b => b.passnew).required().withMessage(`Mật khẩu mới không được bỏ trống.`)
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/).withMessage(`Mật khẩu từ 8 - 20 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.`)
  .ensure(c => c.passnewpre).required().withMessage(`Nhập lại mật khẩu mới không được bỏ trống.`)
  .satisfiesRule('matchesProperty', 'passnew').withMessage('Mật khẩu không trùng nhau')
  .on(Profile);
