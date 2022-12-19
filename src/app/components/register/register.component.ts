import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private mode = 'req';
  activeEdit: any;
  private postId: any;
  userInfo: any;
  activeSignUp: any;
  constructor(
    private service: ServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'reqEdit';
        this.activeEdit = 'reqEdit';

        this.postId = paramMap.get('postId');

        this.service.getprofileById(this.postId).subscribe((response) => {
          console.log(response.finduser);
          const StoredoctorInfo = response.finduser;
          console.log(StoredoctorInfo);

          this.userInfo = {
            id: StoredoctorInfo.id,
            Name: StoredoctorInfo.Name,
            LastName: StoredoctorInfo.LastName,
            Email: StoredoctorInfo.Email,
            Password: StoredoctorInfo.Password,
          };
          console.log(this.userInfo);
        });
      } else {
        this.mode = 'req';
        this.activeSignUp = 'req';
        this.postId = null;
      }
    });
  }

  onSignup(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }
    let formData: any = {
      Name: form.value.Name,
      LastName: form.value.LastName,
      Email: form.value.Email,

      Password: form.value.Password,
    };

    console.log(formData);

    form.resetForm();
    if (this.mode === 'req') {
      this.service.register(formData).subscribe((response: any) => {
        console.log(response.token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('token', response.token);
        alert('registered succesfully');
        this.router.navigate(['/']);
      });
    } else {
      this.service.updateUser(this.postId, formData).subscribe((response) => {
        console.log(formData);

        alert('updated succesfully');
        this.router.navigate(['/']);
      });
    }
  }
}
