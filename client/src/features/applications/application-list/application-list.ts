import { Component, inject } from '@angular/core';
import { ApplicationService } from '../../../core/services/application-service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Application } from '../../../types/application';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-application-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './application-list.html',
  styleUrl: './application-list.css'
})
export class ApplicationList {
  private applicationService = inject(ApplicationService);
  protected applications$: Observable<Application[]>;

  constructor() {
    this.applications$ = this.applicationService.getJobApplications();
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Applied': 'bg-blue-100 text-blue-800',
      'Interview': 'bg-yellow-100 text-yellow-800',
      'Offer': 'bg-green-100 text-green-800',
      'Denied': 'bg-red-100 text-red-800',
      'Withdrawn': 'bg-gray-100 text-gray-800',
      'In Review': 'bg-purple-100 text-purple-800'
    };
    
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  }

  editApplication(application: Application): void {
    // Implement edit functionality
    console.log('Edit application:', application);
  }

  deleteApplication(id: number): void {
    // Implement delete functionality
    console.log('Delete application:', id);
  }

  addApplication(): void {
    // Implement add functionality
    console.log('Add new application');
  }
}
