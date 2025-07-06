import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Application } from '../../types/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private http = inject(HttpClient);
  private baseUrl = "https://localhost:5001/api/"

  getJobApplications() {
    return this.http.get<Application[]>(this.baseUrl + 'jobapplication');
  }

  getApplication(id: number) {
    return this.http.get<Application>(this.baseUrl + 'jobapplication/' + id);
  }

  createApplication(jobDeets: any) {
    return this.http.post<Application>(this.baseUrl + 'jobapplication', jobDeets);
  }

  updateApplication(id: number, updatedJobDeets: any) {
    return this.http.put<Application>(this.baseUrl + 'jobapplication/' + id, updatedJobDeets);
  }

  deleteApplication(id: number) {
    return this.http.delete(this.baseUrl + 'jobapplication/' + id)
  }
}
