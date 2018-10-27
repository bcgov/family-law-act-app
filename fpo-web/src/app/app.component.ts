import { Component, OnInit, Renderer2 } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { GeneralDataService } from './general-data.service';
import { InsertService } from './insert/insert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  previousUrl: string;
  isPopState: boolean;

  constructor(
      private renderer: Renderer2,
      private router: Router,
      private locStrat: LocationStrategy,
      private dataService: GeneralDataService,
  ) { }

  ngOnInit(): void {
  	this.locStrat.onPopState(() => {
      this.isPopState = true;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        if (!this.isPopState) {
          // scroll to page top only when navigating to a new page (not via history state)
          window.scrollTo(0, 0);
          this.isPopState = false;
        }
        this.isPopState = false;

        let prevSlug = this.previousUrl;
        let nextSlug = event.url.slice(1).replace(/^prv\//, '').replace('/', '-');
        if (!nextSlug) nextSlug = 'home';
        if (prevSlug) {
          this.renderer.removeClass(document.body, 'ctx-' + prevSlug);
        }
        if (nextSlug) {
          this.renderer.addClass(document.body, 'ctx-' + nextSlug);
        }
        this.previousUrl = nextSlug;
      }
    });
  }

  quickExit(): void {
    this.dataService.quickExit();
  }
}
