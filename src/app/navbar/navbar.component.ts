import { Component, OnInit } from '@angular/core';

import { GoogleAuthenticationService } from '../google-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public googleAuthenticationService: GoogleAuthenticationService) { }

  ngOnInit() {
  }

  login() {
    this.googleAuthenticationService.login()
    .catch((error:any) => {alert(error)});
  }
}
