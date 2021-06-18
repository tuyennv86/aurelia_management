export class Admin
{
  configureRouter(config, router)
  {
    config.map([
      {
        route: ['', 'dashboard'], name: 'dashboard', moduleId: './dashboard/dashboard', title: 'Welcome dashboard admin', layoutViewModel: './layout/main-layout'
      },
      {
        route: 'products', name: 'products', moduleId: './products/products', title: 'Products list', layoutViewModel: './layout/main-layout'
      },
      {
        route: 'users/:page?', name: 'users', moduleId: './users/list-user', title: 'Danh sách user name', layoutViewModel: './layout/main-layout'
      },
      {
        route: 'users/edit/:id', name: 'editusers', moduleId: './users/edit-user', title: 'Sửa user name', layoutViewModel: './layout/main-layout'
      },
      {
        route: 'users/add', name: 'adduser', moduleId: './users/add-user', title: 'Thêm mới user name', layoutViewModel: './layout/main-layout'
      },
      {
        route: 'profile/:username', name: 'profile', moduleId: './users/profile', title: 'Profile user', layoutViewModel: './layout/main-layout'
      }
    ]);

    this.router = router;
  }
}
