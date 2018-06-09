import { TestBed, inject } from '@angular/core/testing';

import { EventPluralMappingService } from './event-plural-mapping.service';

describe('EventPluralMappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventPluralMappingService]
    });
  });

  it('should be created', inject([EventPluralMappingService], (service: EventPluralMappingService) => {
    expect(service).toBeTruthy();
  }));
});
