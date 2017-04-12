import { Component } from '@angular/core';
import { AF } from "./providers/af";
import { Router } from "@angular/router";
import { User } from "./user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StartPup';
  showSignup: boolean = false;
  showLogin: boolean = false;
  public isLoggedIn: boolean;
  public currentUser;

  constructor(public afService: AF, private router: Router) {
    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
          this.isLoggedIn = false;
        } else {
          this.afService.uid = auth.auth.uid;
          this.afService.displayName = auth.auth.displayName;
          this.afService.email = auth.auth.email;
          console.log(auth.auth);
          console.log(this.afService.uid);
          // UPDATE: I forgot this at first. Without it when a user is logged in and goes directly to /login
          // the user did not get redirected to the home page.
          this.isLoggedIn = true;
          console.log("logged in");
          this.router.navigate(['']);
        }
      }
    );
  }

  logout() {
    this.afService.logout();
  }
}
