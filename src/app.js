import { AuthService } from "./services/auth-service";
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { AuthorizeStep } from "./router-steps/authorization-step";
import 'bootstrap';
import 'jquery';

@inject(AuthService, HttpClient)
export class App
{
  constructor(authService, http)
  {
    this.authService = authService;
    const baseUrl = "http://localhost:3000/";

    http.configure(config =>
    {
      config
        .withBaseUrl(baseUrl)
        .withInterceptor(this.authService.tokenInterceptor);
    });
  }

  configureRouter(config, router)
  {
    this.router = router;
    config.title = 'Aurelia';
    config.options.pushState = true;
    config.options.root = '/';

    let step = new AuthorizeStep(this.authService);

    config.addAuthorizeStep(step);

    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: './welcome', nav: true, settings: { auth: true }, title: 'Welcome' },
      { route: 'users', name: 'users', moduleId: './users', nav: true, title: 'Github Users' },
      { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
      { route: 'login', name: 'login', moduleId: './Admin/login/login', nav: true, title: 'Đang nhập hệ thống', layoutViewModel: './layout/login-layout' },
      { route: 'admin', name: 'admin', moduleId: './Admin/admin', nav: true, title: 'Admin cms' }

    ]);



  }


}
