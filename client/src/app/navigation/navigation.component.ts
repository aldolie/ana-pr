import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { 
      this.isLoggedIn = authService.isLoggedIn();
      this.isAdmin = authService.isAdmin();
      this.authService.getSession.subscribe(session => {
          this.fetchSessionState();
      });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  fetchSessionState() {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.isAdmin = this.authService.isAdmin();
  }

}
