import { inject } from 'aurelia-framework';
import { UserApi } from '../../services/user-api'
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../renderers/bootstrap-form-renderer';

@inject(UserApi, ValidationControllerFactory)

export class AddUser
{
  rules = ValidationRules
    .ensure('username').required().withMessage('Username không được bỏ trống.')
    .matches(/^[a-zA-Z\d]{4,20}$/).withMessage('User phải từ 4 - 20 ký tự.')

    .ensure('password').required().withMessage('Mật khẩu không được bỏ trống.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/).withMessage('Mật khẩu từ 8 - 20 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.')

    .ensure('fullname').required().withMessage('Họ tên không được để trống')

    .ensure('email').required().withMessage('Email không được bỏ trống')
    .email().withMessage('Email sai định dạng')

    .ensure('phone').required().withMessage('Điện thoại không được bỏ trống')
    .rules;

  constructor(userApi, controllerFactory)
  {
    this.user = {
      id: 0,
      fullname: "",
      username: "",
      password: "",
      email: "",
      imageUrl: "",
      phone: ""

    }
    this.message = "";
    this.userApi = userApi;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }


  submit()
  {

    this.controller.validate().then(result =>
    {
      if (result.valid)
      {
        if (this.files)
        {
          this.userApi.addUserImg(this.user, this.files[0]).then(fetchedUser =>
          {
            this.user = fetchedUser;
            this.message = "Cập nhật thành công !";
          });
        } else
        {
          this.userApi.addUser(this.user).then(fetchedUser =>
          {
            this.user = fetchedUser;
            this.message = "Cập nhật thành công !";
          });
        }
      }
    });
  }

}
