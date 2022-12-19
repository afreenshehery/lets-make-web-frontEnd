import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  storeUser: any = [];
  storeProject: any = [];
  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    let userId: any = localStorage.getItem('userId');
    // console.log(storeId);

    this.service.getprofileById(userId).subscribe((respons) => {
      console.log(respons.findpro);
      let store = respons.finduser;
      this.storeUser.push(respons.finduser);
      this.storeProject.push(respons.findpro);
    });
  }
}
