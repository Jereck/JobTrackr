import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected title = 'JobTrackr';
  protected applications = signal<any>([]);

  async ngOnInit() {
    this.applications.set(await this.getJobApplications());
  }

  async getJobApplications() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/jobapplication'))
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
}
