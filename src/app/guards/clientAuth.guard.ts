import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


@Injectable()
export class ClientAuthGuard implements CanActivate {

  redirectUrl;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }


  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    if (this.apiService.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/']);
      return false;
    }
  }
}
