import { TestBed, inject } from '@angular/core/testing';

import { PostInfoService } from './post-info.service';

describe('PostInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostInfoService]
    });
  });

  it('should be created', inject([PostInfoService], (service: PostInfoService) => {
    expect(service).toBeTruthy();
  }));
});
