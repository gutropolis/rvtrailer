import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './../api.service';

@Injectable()
export class ClientNotAuthGuard implements CanActivate {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }


  canActivate() {

    if (this.apiService.loggedIn()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
