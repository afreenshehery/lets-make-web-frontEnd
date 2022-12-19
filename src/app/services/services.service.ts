import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  url = environment.url;
  constructor(private http: HttpClient, private router: Router) {}

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      token: localStorage.getItem('token') || '',
    });
    return headers;
  }

  register(authData: any) {
    return this.http.post<{ userId: any; token: any }>(
      `${this.url}/signUp`,
      authData,
      {}
    );
  }

  login(authData: any) {
    return this.http.post<{ userId: any; token: any; status: any }>(
      `${this.url}/logIn`,
      authData,
      {}
    );
  }
  treeViewPost(allData: any) {
    // const authData = TEXt;
    return this.http.post<{ data: any }>(`${this.url}/treeView`, allData);
  }

  postProjectDetails(allData: any) {
    return this.http.post<{ data: any; findPoject: any }>(
      `${this.url}/project`,
      allData,
      {
        headers: this.getHeader(),
      }
    );
  }

  getProjectById(id: string) {
    return this.http.get<{ DoctorInfo: any }>(
      `${this.url}/register_info/` + id,
      {
        headers: this.getHeader(),
      }
    );
  }

  getprofileById(id: string) {
    return this.http.get<{ findpro: any; finduser: any }>(
      `${this.url}/getUserDetails/` + id,
      {
        headers: this.getHeader(),
      }
    );
  }

  updateUser(id: any, formData: any) {
    const post: any = formData;
    return this.http.put(`${this.url}/UserUpdate/` + id, post, {
      headers: this.getHeader(),
    });
  }

  getAllUserInfo(datat: any) {
    return this.http.post<{ data: any; findPoject: any; getProductCount: any }>(
      `${this.url}/getAllUser`,
      datat,
      {
        headers: this.getHeader(),
      }
    );
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.url}/deteleUser/` + id, {
      headers: this.getHeader(),
    });
  }
}
