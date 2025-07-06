import { Component, inject, OnInit, signal } from '@angular/core';
import { Application } from '../../types/application';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../core/services/application-service';

interface ApplicationStats {
  totalApplications: number;
  pendingApplications: number;
  interviews: number;
  responseRate: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private router = inject(Router);
  private applicationService = inject(ApplicationService);

  stats = signal<ApplicationStats>({
    totalApplications: 0,
    pendingApplications: 0,
    interviews: 0,
    responseRate: 0
  });

  recentApplications: Application[] = [];

  ngOnInit(): void {
    this.applicationService.getJobApplications().subscribe({
      next: apps => {
        console.log("Apps: ", apps)
        this.recentApplications = apps
          .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime())
          .slice(0, 5);

        this.stats.set(this.calculateStats(apps));
        console.log("Stats: ", this.stats);
      },
      error: err => console.error('Failed to load applications', err)
    });
  }

  private calculateStats(apps: Application[]): ApplicationStats {
    const total = apps.length;
    const pending = apps.filter(a => a.status === 'Pending').length;
    const interviews = apps.filter(a => a.status === 'Interview').length;
    const responses = total - pending;
    const responseRate = total > 0 ? Math.round((responses / total) * 100) : 0;

    console.log(`
      Total: ${total}
      Pending: ${pending}
      Interviews: ${interviews}
      Responses: ${responses}
      Response Rate: ${responseRate}
      `);

    return {
      totalApplications: total,
      pendingApplications: pending,
      interviews,
      responseRate
    };
  }
}
