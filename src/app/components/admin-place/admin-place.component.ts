import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-admin-place',
  templateUrl: './admin-place.component.html',
  styleUrls: ['./admin-place.component.css'],
})
export class AdminPlaceComponent implements OnInit {
  store: any = [];
  showProject = false;
  projectInfo: any = [];
  showNextPage = false;
  showpreePage = false;
  array: any = [];
  count: any;

  // pagination............
  page: any = [];
  p: any = 1;
  limit: any = 5;

  // pagimation..........
  noprojectFound = false;
  sortPage: any = [];
  order: any = 'order';
  constructor(private service: ServicesService) {}
  getlist() {}
  ngOnInit(): void {
    this.getlist();
    let limit = {
      limit: this.limit,
      page: '',
    };
    this.service.getAllUserInfo(limit).subscribe((response) => {
      console.log(response.getProductCount.count);
      this.count = response.getProductCount.count;
      console.log(this.count);
      this.store = [];
      this.store = response.data;
      console.log(this.store);

      this.array = Array(Math.ceil(response.getProductCount.count / this.limit))
        .fill(0)
        .map((x, i) => i + 1);
      console.log(this.array);
    });

    // return array;
  }

  getProject(userId: any) {
    console.log(userId);

    this.service.getprofileById(userId).subscribe((respons) => {
      console.log(respons.findpro);

      if (respons.findpro === null) {
        this.noprojectFound = true;
        this.showProject = false;
      } else {
        this.showProject = true;
        this.noprojectFound = false;
      }
      console.log(this.showProject);
      this.projectInfo = [];
      this.projectInfo.push(respons.findpro);
    });
  }
  deleteuser(userId: any) {
    this.service.deleteUser(userId).subscribe((respons) => {
      console.log(respons);
      this.getlist();
    });
  }

  // onChangePage(p: any) {
  //   console.log(p, 'hhh');
  //   this.sortPage = p;
  //   this.page = '';
  //   let limit = {
  //     limit: this.limit,
  //     page: p,
  //   };
  //   this.service.getAllUserInfo(limit).subscribe((Response) => {
  //     console.log(Response);
  //     this.store = [];
  //     this.store = Response.data;
  //   });
  // }
  desendin(order: any) {
    console.log(this.sortPage);
    let orders = {
      order: 'order',
      // page: this.sortPage,
    };
    this.service.getAllUserInfo(orders).subscribe((response) => {
      console.log(response.data);
      this.store = response.data;
    });
  }

  search(form: NgForm) {
    console.log(form);
    let search = {
      search: form.value.Name,
    };
    console.log(search);

    this.service.getAllUserInfo(search).subscribe((response) => {
      this.store = [];
      this.store.push(response.data);
      console.log(response.data);
    });
  }

  page1(page: any) {
    console.log(page);
    // console.log(p, 'hhh');
    this.sortPage = page;
    this.page = '';
    let limit = {
      limit: this.limit,
      page: page,
    };
    this.service.getAllUserInfo(limit).subscribe((Response) => {
      console.log(Response);
      this.store = [];
      this.store = Response.data;
    });
  }

  pagechange() {
    this.showNextPage = true;
    this.showpreePage = false;
  }

  prepagechange() {
    this.showpreePage = true;
    this.showNextPage = false;
  }

  // pageNumber(): number[] {
  //   let array = Array(Math.ceil(100 / 10))
  //     .fill(0)
  //     .map((x, i) => i + 1);
  //   console.log(array);

  //   return array;
  // }

  changePage(page: any) {
    console.log(page);

    let limit = {
      limit: this.limit,
      page: page,
    };
    this.service.getAllUserInfo(limit).subscribe((Response) => {
      console.log(Response);
      this.store = [];
      this.store = Response.data;
    });
  }

  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.limit = Number(newSize);
    this.changePage(1);

    this.array = Array(Math.ceil(this.count / this.limit))
      .fill(0)
      .map((x, i) => i + 1);
    console.log(this.array);
  }
}
