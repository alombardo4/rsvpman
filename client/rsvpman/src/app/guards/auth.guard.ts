import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    token: string | null;

    constructor(private loginService: LoginService, private router: Router) {
        this.loginService.token.subscribe(t => this.token = t);
    }

    canActivate() {
        if(this.token) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}