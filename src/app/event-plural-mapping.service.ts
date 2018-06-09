import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventPluralMappingService {

  constructor() { }

  eventPluralMapping:{[k: string]: string} = {'=0': 'No events', '=1': 'One event', 'other': '# events'};

}
