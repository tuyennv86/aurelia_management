import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { AuthService } from '../services/auth-service';
import { UserApi } from '../services/user-api'

@inject(Router, AuthService, UserApi)
export class NavBar
{
  constructor(router, authService, userApi)
  {
    this.authService = authService;
    this.router = router;
    this.userApi = userApi;
  }

  bind()
  {
    this.username = this.authService.getUser();
    this.userApi.getUser(this.username).then(fetchedUser =>
    {
      this.user = fetchedUser;
    });

  }

  logout()
  {
    this.authService.logOut();
    this.router.navigateToRoute('login');
  }
}
