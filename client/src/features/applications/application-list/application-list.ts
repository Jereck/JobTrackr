import { Component, inject } from '@angular/core';
import { ApplicationService } from '../../../core/services/application-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Application } from '../../../types/application';

@Component({
  selector: 'app-application-list',
  imports: [AsyncPipe],
  templateUrl: './application-list.html',
  styleUrl: './application-list.css'
})
export class ApplicationList {
  private applicationService = inject(ApplicationService);
  protected applications$: Observable<Application[]>;

  constructor() {
    this.applications$ = this.applicationService.getJobApplications();
  }
}
