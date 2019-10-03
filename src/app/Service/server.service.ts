import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private baseURL = "http://localhost:3002";
  private loginUrl = "http://localhost:3001/login";

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post(this.loginUrl, user);
  }

  getUser(id) {
    return this.http.get(this.baseURL + "/users/" + id);
  }

  getUsers() {
    return this.http.get(this.baseURL + "/users");
  }

  getUserVacations(id) {
    return this.http.get(this.baseURL + "/usersVacations?userid=" + id);
  }

  getRequests() {
    return this.http.get(this.baseURL + "/usersVacations?done=false");
  }

  updateUser(user) {
    return this.http.patch(this.baseURL + "/users/" + user.id, user);
  }

  manageRequest(vac) {
    return this.http.patch(this.baseURL + "/usersVacations/" + vac.id, vac);
  }

  addUser(user) {
    return this.http.post(this.baseURL + "/users", user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  setUserVacation(day) {
    return this.http.post(this.baseURL + "/usersVacations", day, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  setDeletedVacation(vac) {
    return this.http.post(this.baseURL + "/deletedVacations", vac, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  deleteUser(id) {
    return this.http.delete(this.baseURL + "/users/" + id);
  }

  deleteVacation(id) {
    return this.http.delete(this.baseURL + "/usersVacations/" + id);
  }

  deleteUserVacation(userid) {
    return this.http.delete(this.baseURL + "/usersVacations?userid=" + userid);
  }
}
