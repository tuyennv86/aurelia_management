import $ from 'jquery';

export class LoginLayout
{

  attached()
  {
    $(function ()
    {
      $('body').removeClass("sb-nav-fixed").addClass("bg-primary");
    });

  }

}
