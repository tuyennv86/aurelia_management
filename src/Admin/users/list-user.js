import { bindable, inject } from 'aurelia-framework';
import { UserApi } from '../../services/user-api'

@inject(UserApi)
export class ListUser
{
  constructor(userApi)
  {
    this.userApi = userApi;

    this.limit = 10;// số bản ghi trên 1 trang
    this.totalPage = 0;// tong sô trang hien thị
    this.linkrouter = "users"; // router 
    this.currentPage = 1; // trang hien tại đang ở trang mấy
  }

  bind()
  {
    this.userApi.getListUser(this.currentPage, this.limit).then(dataUser =>
    {
      this.data = dataUser.data;
      this.totalPage = Math.ceil(dataUser.totalCount / dataUser.limit);
    });
  }

  activate(params)
  {
    this.currentPage = parseInt(params.page || '1');
    console.log(this.currentPage + " day la page");
    this.userApi.getListUser(this.currentPage, this.limit).then(dataUser =>
    {
      this.data = dataUser.data;
      this.totalPage = Math.ceil(dataUser.totalCount / dataUser.limit);
    });
  }

}
