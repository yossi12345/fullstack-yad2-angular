import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PublishApartmentService } from '../services/publish-apartment.service';
import { firstValueFrom } from 'rxjs';

export const getApartmentTypesResolver: ResolveFn<any> = (route, state) => {
  const publishService=inject(PublishApartmentService)
  return publishService.getTypes()
};
