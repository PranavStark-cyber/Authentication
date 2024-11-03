import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginandsignupService, User } from '../../Servies/loginandsignup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent {
  signupForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private LoginandsignupService: LoginandsignupService, private router: Router, private rout: ActivatedRoute, private toastr: ToastrService) {

    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator })
  }


  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  
  Adduser() {
    var user = this.signupForm.value;

    const usersignUp:User = {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      role: Number(user.role)
    }

    this.LoginandsignupService.registeradd(usersignUp).subscribe(data => {
      this.toastr.success("User Added Successfully..", "", {
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







