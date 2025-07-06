import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ApplicationService } from '../../core/services/application-service';
import { EMPTY } from 'rxjs';
import { Application } from '../../types/application';

export const applicationResolver: ResolveFn<Application> = (route, state) => {
  const applicationService = inject(ApplicationService);
  const router = inject(Router);
  const applicationId = route.paramMap.get('id');

  if (!applicationId) {
    router.navigateByUrl('/')
    return EMPTY;
  }

  return applicationService.getApplication(+applicationId);
};
