/**
 * Based on:
 * - https://github.com/stefanreichert/angular2-google-calendar-example
 * - https://developers.google.com/calendar/quickstart/js
 */
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthenticationService {

	static CLIENT_ID = environment.GOOGLE_CLIENT_ID;
	static API_KEY = environment.GOOGLE_API_KEY;

  // Array of API discovery doc URLs for APIs
  static DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  static SCOPES = "https://www.googleapis.com/auth/calendar";

  public isAuthenticated: boolean = false;
  
  constructor() {
		gapi.load('client:auth2', this.internalAuthenticate(true));
  }

  login() {
		console.log('proceed login');
    // check the authentication and present a dialog on failure
    this.internalAuthenticate(false);
  }

  private internalAuthenticate(immediate: boolean){
		 return this.proceedAuthentication(immediate)
		 .then(() => this.initializeGoogleCalendarAPI())
		 .then((response:any) => console.log(response))
		 .catch((error:any) => {console.log('authentication failed: ' + error)});
  }
  
	private proceedAuthentication(immediate:boolean){
		return new Promise((resolve, reject) => {
			console.log('proceed authentication - immediate: ' + immediate);
			gapi.client.setApiKey(GoogleAuthenticationService.API_KEY);
			var authorisationRequestData =
			{
				'client_id': GoogleAuthenticationService.CLIENT_ID, 
				'scope': GoogleAuthenticationService.SCOPES, 
				'immediate': immediate
			} 
			gapi.auth.authorize(authorisationRequestData,
				(authenticationResult) => {
          console.log('result:' + authenticationResult);
          console.log(authenticationResult);
          console.log('error?' + authenticationResult.error);
					if(authenticationResult && !authenticationResult.error){
						this.isAuthenticated = true
						resolve()
					}
					else {
						this.isAuthenticated = false
						reject(new Error(authenticationResult.error));
					}
				}
			);
    });
  }
  
  private initializeGoogleCalendarAPI(){
		return new Promise((resolve, reject) => {
			console.log('initialize Google Calendar API');
			resolve(gapi.client.load('calendar', 'v3'));
		});
  }
}
