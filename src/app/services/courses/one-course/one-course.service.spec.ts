import { TestBed } from '@angular/core/testing';

import { OneCourseService } from './one-course.service';

describe('OneCourseService', () => {
  let service: OneCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
