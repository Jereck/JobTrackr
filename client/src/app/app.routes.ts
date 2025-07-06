import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { ApplicationList } from '../features/applications/application-list/application-list';
import { ApplicationDetailed } from '../features/applications/application-detailed/application-detailed';
import { applicationResolver } from '../features/applications/application-resolver';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'applications', component: ApplicationList },
  { path: 'applications/:id', component: ApplicationDetailed, resolve: { application: applicationResolver } },
  { path: '**', component: Home }
];
