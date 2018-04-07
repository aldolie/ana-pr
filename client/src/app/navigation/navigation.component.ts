import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { 
      this.isLoggedIn = authService.isLoggedIn();
      this.authService.getSession.subscribe(session => {
          if (session == null) {
              this.isLoggedIn = false
          } else {
              this.isLoggedIn = true;
          }

      });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
