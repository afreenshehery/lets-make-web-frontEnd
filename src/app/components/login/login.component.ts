import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private service: ServicesService, private router: Router) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    console.log(form);

    if (form.invalid) {
      return;
    }
    let formData: any = {
      Email: form.value.Email,
      Password: form.value.Password,
    };
    form.resetForm();

    this.service.login(formData).subscribe((response: any) => {
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('token', response.token);
      localStorage.setItem('status', response.status);
      alert('loggedIn succesfully');
      if (response.status === 1) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
