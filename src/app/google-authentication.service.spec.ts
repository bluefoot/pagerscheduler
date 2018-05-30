import { TestBed, inject } from '@angular/core/testing';

import { GoogleAuthenticationService } from './google-authentication.service';

describe('GoogleAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAuthenticationService]
    });
  });

  it('should be created', inject([GoogleAuthenticationService], (service: GoogleAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
