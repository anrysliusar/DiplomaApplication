import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserRegisterModel} from "../../model/user.model";
import {AuthApiService} from "../../service/core/auth-api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './../security-shared.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private router: Router,
              private authService: AuthApiService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup<any>({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  register() {
    if (this.registerForm.valid) {
      const user: UserRegisterModel = this.registerForm.getRawValue();
      this.authService.register(user).subscribe();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']).then();
  }
}
