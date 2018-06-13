import { Injectable }  from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { GeneralDataService } from '../general-data.service'

@Injectable()
export class UserStatusResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private dataService: GeneralDataService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return Observable.fromPromise(
      this.dataService.requireLogin().catch(this.handleLoadError.bind(this)));
  }

  handleLoadError() {
    this.router.navigate(['prv/status']);
  }
}
