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
}
