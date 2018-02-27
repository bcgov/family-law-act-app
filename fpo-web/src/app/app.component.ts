import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { StaticComponent } from './static/static.component';
import { InsertService } from './insert/insert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  previousUrl: string;

  constructor(
      private renderer: Renderer2,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private insertService : InsertService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let prevSlug = this.previousUrl;
        let nextSlug = event.url.slice(1);
        if (!nextSlug) nextSlug = 'home';
        if (prevSlug) {
          this.renderer.removeClass(document.body, 'ctx-' + prevSlug);
        }
        if (nextSlug) {
          this.renderer.addClass(document.body, 'ctx-' + nextSlug);
        }
        this.previousUrl = nextSlug;

        let route = this.activatedRoute;
        let sidebarLeft = null;
        let sidebarRight = null;

        while(route.firstChild)
          route = route.firstChild;
        if(route.outlet === 'primary') {
          let data = route.snapshot.data;
          if(data && data['sidebar-left'])
            sidebarLeft = {component: StaticComponent, inputs: {href: data['sidebar-left']}};
          if(data && data['sidebar-right'])
            sidebarRight = {component: StaticComponent, inputs: {href: data['sidebar-right']}};
        }

        insertService.updateInsert('sidebar-left', sidebarLeft);
        insertService.updateInsert('sidebar-right', sidebarRight);
      }
    });
  }
}
