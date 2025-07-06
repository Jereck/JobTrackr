import { Component, inject, OnInit } from '@angular/core';
import { Application } from '../../types/application';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ApplicationStats {
  totalApplications: number;
  pendingApplications: number;
  interviews: number;
  responseRate: number;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private router = inject(Router);

  stats: ApplicationStats = {
    totalApplications: 0,
    pendingApplications: 0,
    interviews: 0,
    responseRate: 0
  };

  recentApplications: Application[] = [];

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentApplications();
  }

  private loadStats(): void {
    // Load your application statistics
    // This would typically come from your service
    this.stats = {
      totalApplications: 24,
      pendingApplications: 8,
      interviews: 3,
      responseRate: 65
    };
  }

  private loadRecentApplications(): void {
    // Load recent applications (last 5)
    // This would typically come from your service
    // this.applicationService.getRecentApplications(5).subscribe(apps => {
    //   this.recentApplications = apps;
    // });
  }
}
