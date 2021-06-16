import { inject } from 'aurelia-framework';
import { UserApi } from '../../services/user-api'
import * as bootbox from 'bootbox';
import _ from 'lodash';

@inject(UserApi)
export class ListUser
{
  constructor(userApi)
  {
    this.userApi = userApi;
    this.data = [];
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
    this.userApi.getListUser(this.currentPage, this.limit).then(dataUser =>
    {
      this.data = dataUser.data;
      this.totalPage = Math.ceil(dataUser.totalCount / dataUser.limit);
    });
  }

  removeUser(userRemove)
  {
    const self = this;
    bootbox.confirm({
      message: "Bạn có chắc chắc muốn XÓA không ?", locale: 'vi', callback: function (result)
      {
        if (result)
        {
          self.userApi.deleteUser(userRemove).then(() =>
          {
            let userIndex = _.findIndex(self.data, function (o) { return o.id === userRemove.id; });
            self.data.splice(userIndex, 1);
          });
        }
      }
    });
  }



}
