import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../../../types/application';

@Component({
  selector: 'app-application-detailed',
  imports: [],
  templateUrl: './application-detailed.html',
  styleUrl: './application-detailed.css'
})
export class ApplicationDetailed implements OnInit{
  private route = inject(ActivatedRoute);
  protected application = signal<Application | undefined>(undefined);

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.application.set(data['application'])
    })
  }
}
