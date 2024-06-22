import { TestBed } from '@angular/core/testing';

import { ImageProcessingServiceService } from './image-processing-service.service';

describe('ImageProcessingServiceService', () => {
  let service: ImageProcessingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageProcessingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
