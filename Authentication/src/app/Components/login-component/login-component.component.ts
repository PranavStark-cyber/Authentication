import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginandsignupService, User } from '../../Servies/loginandsignup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private LoginandsignupService :LoginandsignupService,private router: Router, private rout: ActivatedRoute, private toastr: ToastrService) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: ['']
    });
  }

  onSubmit() {
    var user = this.signinForm.value;

    const usersignin: User = {
      fullName: null,
      email: user.email,
      password: user.password,
      role: null
    }

    this.LoginandsignupService.loginadd(usersignin).subscribe(data => {
      this.toastr.success("User login  Successfully..", "", {
        positionClass: "toast-top-right",
        progressBar: true,
        timeOut: 4000
      })
      this.router.navigate(['/'])
    }, error => {
      this.toastr.warning("User : " + error.error.title, "", {
        positionClass: "toast-top-right",
        progressBar: true,
        timeOut: 4000
      })
    })
  }
}

