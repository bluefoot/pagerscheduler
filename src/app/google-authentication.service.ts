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
  
  constructor() { }
	
	loadApiAndAuthenticateIfNeeded() {
		let googleAuthService = this;
		return new Promise((resolve, reject) => {
			gapi.load('client:auth2', function() {
					googleAuthService.internalAuthenticate(true)
					.then(() => resolve())
					.catch((error:any) => reject(error))
				}
			);
		});
	}

  login() {
    return this.internalAuthenticate(false);
  }

  private internalAuthenticate(immediate: boolean){
		 return new Promise((resolve, reject) => {
			 this.proceedAuthentication(immediate)
		 	 .then(() => this.initializeGoogleCalendarAPI())
			 .then(() => resolve())
		   .catch((error:any) => reject('authentication failed: ' + error));
		});
  }
  
	private proceedAuthentication(immediate:boolean){
		return new Promise((resolve, reject) => {
			gapi.client.setApiKey(GoogleAuthenticationService.API_KEY);
			var authorisationRequestData =
			{
				'client_id': GoogleAuthenticationService.CLIENT_ID, 
				'scope': GoogleAuthenticationService.SCOPES, 
				'immediate': immediate
			} 
			gapi.auth.authorize(authorisationRequestData,
				(authenticationResult) => {
					if(authenticationResult && !authenticationResult.error){
						this.isAuthenticated = true
						resolve()
					}
					else {
						this.isAuthenticated = false
						if(immediate && 
							authenticationResult.error && authenticationResult.error == 'immediate_failed') {
							// this means pager was trying to auto authenticate but user was 
							// not previously logged. So don't show errors.
							resolve();
						}
						reject(new Error(authenticationResult.error));
					}
				}
			);
    });
  }
  
  private initializeGoogleCalendarAPI(){
		return new Promise((resolve, reject) => {
			try {
				gapi.client.load('calendar', 'v3', function() {
					resolve();
				});
			} catch(e) {
				reject(e);
			}
		});
  }
}
