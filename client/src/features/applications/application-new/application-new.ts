import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../../core/services/application-service';
import { Router } from '@angular/router';
import { Application } from '../../../types/application';

@Component({
  selector: 'app-application-new',
  imports: [FormsModule],
  templateUrl: './application-new.html',
  styleUrl: './application-new.css'
})
export class ApplicationNew {
  private router = inject(Router);
  protected applicationService = inject(ApplicationService);
  protected jobDeets: Partial<Application> = { status: 'Applied' }
  protected isSubmitting = false;

  async create() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    try {
      console.log("Creating application...", this.jobDeets);

      const applicationData = {
        ...this.jobDeets,
        dateApplied: new Date()
      }

      await this.applicationService.createApplication(applicationData).subscribe({
        next: () => this.router.navigate(['/applications']),
        error: (err) => {
          console.error("Error creating application: ", err)
          this.isSubmitting = false;
        }
      })
    } catch (error) {
      console.error("Error creating application: ", error);
    } finally {
      this.isSubmitting = false;
    }
  }

  cancel() {
    this.router.navigate(['/applications'])
  }
}
