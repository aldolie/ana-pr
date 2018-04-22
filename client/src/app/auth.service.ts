import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import * as moment from "moment";
import {Session} from './models/session';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {

    @Output() getSession: EventEmitter<any> = new EventEmitter();

    url: string = "http://localhost:3000/api/auth/login";

    session: Session;

    constructor(private http: HttpClient, private router: Router) {
        this.fetchSession();
    }

    login(username: string, password: string) {
        const credentials = {
            email: username,
            password: password
        };
        this.http.post(this.url, credentials).subscribe((data: any) => {
            let {token, expiresIn} = data;
            localStorage.setItem('token', token);
            localStorage.setItem('expires_at', JSON.stringify(moment().second(expiresIn).valueOf()));
            this.fetchSession();
            this.publishSession();
            this.router.navigate(['dashboard']);

        }, error => {
            console.log(error);
        });
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    fetchSession() {
        let token = localStorage.getItem("token");
        if (token != null) {
            const payload = jwt_decode(token);
            let {id, email, role, priviledge} = payload;
            this.session = {
                id: id,
                email: email,
                role: role,
                priviledge: priviledge
            };
        } else {
            this.session = null;
        }

    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
        this.session = null;
        this.publishSession();
        this.router.navigate(['login']);
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    publishSession() {
        this.getSession.emit(this.session);
    }

    isAdmin(): boolean {
        return this.session != null && this.session.role === 1;
    }

    getPriviledge(): number {
        return (this.session != null ? this.session.priviledge : -1);
    }
}
