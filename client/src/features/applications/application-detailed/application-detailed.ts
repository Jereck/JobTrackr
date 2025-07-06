import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../../../types/application';
import { CommonModule, Location, NgClass } from '@angular/common';
import { ApplicationService } from '../../../core/services/application-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-application-detailed',
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './application-detailed.html',
  styleUrl: './application-detailed.css'
})
export class ApplicationDetailed implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private applicationService = inject(ApplicationService);

  protected application = signal<Application | undefined>(undefined);
  protected noteDraft = '';

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.application.set(data['application'])
    })
  }

  get app() {
    return this.application();
  }

  goBack(): void {
    this.location.back();
  }

  editApplication(): void {
    console.log("Edit application")
  }

  deleteApplication(): void {
    const app = this.application();
    if (!app) return;

    if (!confirm(`Are you sure you want to delete the application for ${app.companyName}?`)) return;

    this.applicationService.deleteApplication(app.id).subscribe({
      next: () => {
        console.log("Deleted successfully")
        this.router.navigate(['/applications'])
      },
      error: (err) => console.log("Delete failed: ", err)
    })
  }

  updateStatus(newStatus: string): void {
    const app = this.application();

    if (!app) return;

    const updatedApp = { ...app, status: newStatus };

    this.applicationService.updateApplication(app.id, updatedApp).subscribe({
      next: (updated) => {
        this.application.set(updated);
        console.log("Status updated successfully");
      },
      error: (err) => {
        console.error("Failed to update: ", err);
      }
    })
  }

  addNote(): void {
    const app = this.application();
    if (!app) return;

    this.noteDraft = app.notes ?? '';
  }

  updateNotes(): void {
    const app = this.application();
    if (!app) return;

    const updated = { ...app, notes: this.noteDraft };

    this.applicationService.updateApplication(app.id, updated).subscribe({
      next: (updatedApp) => {
        this.application.set(updatedApp);
        console.log("Notes updated");
      },
      error: (err) => console.error("Failed to update notes", err)
    });
  }

  setReminder(): void {
    console.log("Setting reminder")
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Applied': 'bg-blue-100 text-blue-800',
      'Interview': 'bg-yellow-100 text-yellow-800',
      'Offer': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Withdrawn': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-purple-100 text-purple-800'
    };
    
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  }

  getTimelineIconClass(status: string): string {
    const iconClasses: { [key: string]: string } = {
      'Applied': 'bg-blue-500',
      'Interview': 'bg-yellow-500',
      'Offer': 'bg-green-500',
      'Rejected': 'bg-red-500',
      'Withdrawn': 'bg-gray-500',
      'Pending': 'bg-purple-500'
    };
    
    return iconClasses[status] || 'bg-gray-500';
  }

  getDaysAgo(date: Date): number {
    const today = new Date();
    const applicationDate = new Date(date);
    const diffTime = Math.abs(today.getTime() - applicationDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
