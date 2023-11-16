import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PublishApartmentService } from '../services/publish-apartment.service';

export const getApartmentFeaturesResolver: ResolveFn<any> = (route, state) => {
  const publishService=inject(PublishApartmentService)
  return publishService.getFeatures()
};
