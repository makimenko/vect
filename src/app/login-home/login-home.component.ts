import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../general/service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss']
})
export class LoginHomeComponent implements OnInit {

  @Output() authenticated: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.userAuthenticated = this.userAuthenticated.bind(this);
    this.authenticated.subscribe({
      next: (value:any) => this.userAuthenticated(value),
      error: (err:any) => console.error('Authentication error ' , err)
    });
  }

  userAuthenticated(profile: any) {
    console.log("LoginHomeComponent.userAuthenticated", profile)
    this.gotoDefault();
  }

  gotoDefault() {
    this.router.navigate(["/manager"]);
  }

  ngOnInit(): void {
    console.log("LoginHomeComponent.ngOnInit")
    if (!this.authService.checkIfUserAuthenticated()) {
      this.authService.initialize(this.authenticated);
    } else {
      this.gotoDefault();
    }
  }

  async handleAuthClick() {
    this.authService.handleAuthClick();
  }

}
