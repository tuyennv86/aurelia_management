export class Admin
{
  configureRouter(config, router)
  {
    config.map([
      {
        route: ['', 'dashboard'], name: 'dashboard', moduleId: './dashboard/dashboard', nav: true, title: 'Welcome dashboard admin', layoutViewModel: './layout/main-layout'
      },
      {
        route: 'products', name: 'products', moduleId: './products/products', nav: true, title: 'Products list', layoutViewModel: './layout/main-layout'
      },
      {
        route: 'profile/:username', name: 'profile', moduleId: './users/profile', title: 'Profile user', layoutViewModel: './layout/main-layout'
      }
    ]);

    this.router = router;
  }
}
