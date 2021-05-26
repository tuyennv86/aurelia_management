import $ from 'jquery';

export class MainLayout
{

  attached()
  {
    $(function ()
    {
      $('body').removeClass("bg-primary").addClass("sb-nav-fixed");
    });

    $("#sidebarToggle").on("click", function (e)
    {
      e.preventDefault();
      $("body").toggleClass("sb-sidenav-toggled");
    });

  }

}
