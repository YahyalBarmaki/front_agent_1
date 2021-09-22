import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { identifierModuleUrl } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addEmployer(data: any) {
    return this.http.post("http://localhost:8080/api/addAgent", data)
      .pipe(map(((res: any) => {
        return res;
      }))
      )
  }

  getEmployer() {
    return this.http.get<any>("http://localhost:8080/api/agents")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateEmployer(data: any, id: number) {
    return this.http.post("http://localhost:8080/api/updateAgent/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteEmployer(id: number) {
    return this.http.delete("http://localhost:8080/api/deleteAgent/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

}
