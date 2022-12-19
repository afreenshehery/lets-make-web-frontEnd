import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css'],
})
export class ProjectInfoComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  projectDetails: [] = [];
  store = [];
  selected = '';
  activeSignUp: any;
  activeEdit: any;
  private mode = 'patient';
  private postId: any;
  seasons: any[] = [
    'eCommerce website',
    'Business website',
    'Blog website',
    'Portfolio website',
    'Event website',
    'Personal website',

    'Online forum',
  ];
  favoriteSeason: any;
  ngOnInit(): void {
    this.projectDetails;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'reqEdit';
        this.activeEdit = 'reqEdit';

        this.postId = paramMap.get('id');

        this.service.getProjectById(this.postId).subscribe((response) => {
          console.log(response.DoctorInfo);
          const StoredoctorInfo = response.DoctorInfo;
          console.log(StoredoctorInfo);

          //     this.doctorInfo = {
          //       website: ,
          // discription: ,
          // slote: this.,
          //     };
          // console.log(this.doctorInfo);
        });
      } else {
        this.mode = 'req';
        this.activeSignUp = 'req';
        this.postId = null;
      }
    });
  }
  OnClick(value: any) {
    this.favoriteSeason = '';
    this.favoriteSeason = value;
  }
  onSignup(form: any) {
    let data = {
      website: this.favoriteSeason,
      discription: form.value.comment,
      slote: this.selected,
      id: localStorage.getItem('userId'),
    };

    console.log(data);

    alert('project seved Thank you');
    this.router.navigate(['/']);
    if (this.mode === 'req') {
      this.service.postProjectDetails(data).subscribe((respons) => {
        console.log(respons.findPoject);
        this.projectDetails = respons.findPoject;

        console.log(this.projectDetails);

        localStorage.setItem('projectId', respons.data);
      });
    }
  }
}
