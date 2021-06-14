import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class Pagination
{
  @bindable current; // trang hiện tại
  @bindable routerlink;// tên router
  @bindable pages; // tổng số trang

  constructor(router)
  {
    this.router = router;
  }

  bind()
  {
    this.showDotTop = Number(this.current) > 5 ? Number(this.current) - 4 : 1;
    this.showDotBottom = Number(this.current) + 4 < Number(this.pages) ? 1 : 0;
    let i = this.showDotTop;
    this.arrayPage = [];
    for (; i <= (Number(this.current) + 4) && i <= this.pages; i++)
    {
      this.arrayPage.push(i);
    }
  }

  gotopage(p)
  {
    this.showDotTop = Number(p) > 5 ? Number(p) - 4 : 1;
    this.showDotBottom = Number(p) + 4 < Number(this.pages) ? 1 : 0;
    let i = this.showDotTop;
    this.arrayPage = [];
    for (; i <= (Number(p) + 4) && i <= this.pages; i++)
    {
      this.arrayPage.push(i);
    }

    this.router.navigateToRoute(this.routerlink, { page: p });

  }
}
