import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-navbar></app-navbar><router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer ) {
    iconRegistry.addSvgIcon('model-2q2018',sanitizer.bypassSecurityTrustResourceUrl('/assets/images/model-2q2018.svg'));
    iconRegistry.addSvgIcon('model-classic',sanitizer.bypassSecurityTrustResourceUrl('/assets/images/model-classic.svg'));
    iconRegistry.addSvgIcon('role-full',sanitizer.bypassSecurityTrustResourceUrl('/assets/images/role-full.svg'));
    iconRegistry.addSvgIcon('role-a',sanitizer.bypassSecurityTrustResourceUrl('/assets/images/role-a.svg'));
    iconRegistry.addSvgIcon('role-b',sanitizer.bypassSecurityTrustResourceUrl('/assets/images/role-b.svg'));
    iconRegistry.addSvgIcon('open-in-new',sanitizer.bypassSecurityTrustResourceUrl('/assets/images/open-in-new.svg'));
    iconRegistry.addSvgIcon('help',sanitizer.bypassSecurityTrustResourceUrl('/assets/images/help.svg'));
  }
}
