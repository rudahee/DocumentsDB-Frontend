import { TestBed } from '@angular/core/testing';

import { AllCourseService } from './all-course.service';

describe('AllCourseService', () => {
  let service: AllCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
