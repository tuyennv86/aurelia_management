import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { AuthService } from '../services/auth-service';
import { UserApi } from '../services/user-api'
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Router, AuthService, UserApi, EventAggregator)
export class NavBar
{

  constructor(router, authService, userApi, eventAggregator)
  {
    this.authService = authService;
    this.router = router;
    this.userApi = userApi;
    this.eventAggregator = eventAggregator;

    this.messageInfo = this.eventAggregator.subscribe('userInfo', s =>
    {
      this.user = s.userInfo;
    });
  }

  deactivate()
  {
    this.messageInfo.dispose();
  }

  bind()
  {
    this.username = this.authService.getUser();
    this.userApi.getUser(this.username).then(fetchedUser =>
    {
      if (fetchedUser.statusCode === 401) // check xem server còn phiên của token không nếu hết thì thoát ra và đưa thông báo hết phiên server
      {
        this.eventAggregator.publish('messageErr', { messageErr: 'Phiên làm việc của bạn đã hết hãy đăng nhập lại' });
        this.authService.logOut();
        this.router.navigateToRoute('login');
      }
      this.user = fetchedUser;
    });

  }

  logout()
  {
    this.authService.logOut();
    this.router.navigateToRoute('login');
  }
}
