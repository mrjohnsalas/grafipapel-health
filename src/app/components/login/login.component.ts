import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  withError = false;
  errorMessage: string;
  isLoadingData = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login(email: string, password: string): void {
    this.authenticationService.login(email, password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.withError = true;
        this.errorMessage = error.code + ' - ' +  error.message;
      });
  }

}
