import {Component, inject} from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router"
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  signupForm: FormGroup
  submitted = false
  showPassword = false
  private authService = inject(AuthService)

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      acceptTerms: [false, Validators.requiredTrue],
    })
  }

  get f() {
    return this.signupForm.controls
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  goBack() {
    this.router.navigate(["/login"])
  }

  onSubmit() {
    this.submitted = true

    if (this.signupForm.invalid) {
      return
    }

    console.log("Email:", this.f["email"].value, "Password:", this.f["password"].value);

    this.authService.register(this.f["email"].value, this.f["password"].value)
      .then(response => {
        console.log('Registered:', response);
        let usrObj = {
          uid: response.user.uid,
          email: response.user.email,
          name: response.user.displayName || "alex",
        };
        this.authService.registerBackend(usrObj).then(rb =>
          alert("User registered successfully")
        )
      })
      .catch(err => console.error("Registration failed", err));
  }
}
