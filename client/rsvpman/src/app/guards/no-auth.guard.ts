import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Injectable()
export class NoAuthGuard implements CanActivate {
    token: string | null;

    constructor(private loginService: LoginService, private router: Router) {
        this.loginService.token.subscribe(t => this.token = t);
    }

    canActivate() {
        if(this.token) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}