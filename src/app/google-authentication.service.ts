/**
 * Based on:
 * - https://github.com/stefanreichert/angular2-google-calendar-example
 * - https://developers.google.com/calendar/quickstart/js
 * - https://developers.google.com/identity/protocols/OAuth2WebServer#tokenrevoke
 * - https://developers.google.com/identity/protocols/OAuth2UserAgent
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
					if(console && console.log) console.log(authenticationResult);
					if(authenticationResult && !authenticationResult.error){
						this.isAuthenticated = true
						resolve()
					}
					else {
						this.isAuthenticated = false
						let msg;
						if(immediate && 
							authenticationResult.error && authenticationResult.error == 'immediate_failed') {
							// this means pager was trying to auto authenticate but user was 
							// not previously logged
							msg = 'User not previously logged in. Need to log in explicitly first';
						} else {
							msg = authenticationResult.error
							if(authenticationResult.details) {
								msg += ': ' + authenticationResult.details;
							}
						}
						reject(msg);
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
	
	/**
	 * This is not used because it's a bit ugly.
	 * This is not actually logout, it's revoke the access token.
	 * Ugly because:
	 * - gapi doesn't detect token revoked when page is refreshed.
	 * When I open a new tab, then it correctly detects token is revoked.
	 * - unauthorize token endpoint doesn't accept CORS, so can't just ajax
	 * or use an iframe, must open a new window or popup.
	 * 
	 * Instead, decided to not use this and add an item in the FAQ with the
	 * link for the user to go and revoke tokens if wanted.
	 */
	logout(){
		// reset the gloab application state
		this.isAuthenticated = false;
		/* revoke existing token - there is no Google API support for that, window.fetch() is
		* a replacement for the JS XHTTP Request, is not available in older browsers though.
		*/
		let token = gapi.auth.getToken();
		if(token) {
			let accessToken = gapi.auth.getToken().access_token;
			// static LOGOUT_URL = 'https://accounts.google.com/o/oauth2/revoke?token=';
			// Doesn't work because of CORS
			// window.fetch(GoogleAuthenticationService.LOGOUT_URL + accessToken);
			// This opens a new window, so not cool
			// window.open(GoogleAuthenticationService.LOGOUT_URL + accessToken, '_blank');
			// Cool and good
			this.revokeAccessWithForm(accessToken);
		}
		gapi.auth.setToken(null);
		gapi.auth.signOut();
	}

	// from https://developers.google.com/identity/protocols/OAuth2UserAgent
	revokeAccessWithForm(accessToken) {
		// Google's OAuth 2.0 endpoint for revoking access tokens.
		var revokeTokenEndpoint = 'https://accounts.google.com/o/oauth2/revoke';
	
		// Create <form> element to use to POST data to the OAuth 2.0 endpoint.
		var form = document.createElement('form');
		form.setAttribute('method', 'post');
		form.setAttribute('action', revokeTokenEndpoint);
	
		// Add access token to the form so it is set as value of 'token' parameter.
		// This corresponds to the sample curl request, where the URL is:
		//      https://accounts.google.com/o/oauth2/revoke?token={token}
		var tokenField = document.createElement('input');
		tokenField.setAttribute('type', 'hidden');
		tokenField.setAttribute('name', 'token');
		tokenField.setAttribute('value', accessToken);
		form.appendChild(tokenField);
	
		// Add form to page and submit it to actually revoke the token.
		document.body.appendChild(form);
		form.submit();
	}
}
