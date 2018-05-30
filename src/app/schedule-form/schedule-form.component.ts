import { Component, OnInit, Inject } from '@angular/core';

import { ScheduleModel } from '../schedule-model';
import { GoogleAuthenticationService } from '../google-authentication.service';
import { GoogleCalendarService } from '../google-calendar.service';
import { ScheduleService } from '../schedule.service';
import { Role } from '../schedule.service';

import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {
  private startDate : Date;
  private scheduleModel : ScheduleModel;
  private _scheduleModelId : string;
  private role : any;

  createSchedulePromise: Promise<any>;
  
  constructor(private scheduleService: ScheduleService, 
    public googleAuthenticationService: GoogleAuthenticationService,
    private googleCalendarService: GoogleCalendarService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { 
  }
  
  ngOnInit() {
    this.googleAuthenticationService.loadApiAndAuthenticateIfNeeded()
    .then((response:any) => {this.displayMessage('You are authenticated with google')})
    // This should fail silently. Here's the code in case a message should've been shown
    //.catch((error:any) => {this.displayMessage(error)});
  }

  login() {
    this.googleAuthenticationService.login()
    .then(() => {this.displayMessage('Logged in successfully')})
    .catch((error:any) => {this.displayMessage(error)});
  }

  private displayMessage(msg:string) {
    this.snackBar.open(msg, 'Close', {
      duration: 10000,
    });
  }

  set scheduleModelId(value:string) {
    this.scheduleModel = this.scheduleModels.get(value);
  }

  get scheduleModels() {
    return this.scheduleService.getScheduleModels();
  }

  get roles() : Array<any> {
    return Object.values(Role);
  }

  getValues(map){
    return Array.from(map.values());
  }

  createSchedule() {
    if(!this.googleAuthenticationService.isAuthenticated) {
      let scheduleFormComponent = this; //https://stackoverflow.com/q/34930771
      this.googleAuthenticationService.login()
      .then(() => (scheduleFormComponent.doCreateSchedule()))
      .catch((error:any) => {this.displayMessage('Unable to authenticate on Google: ' + error)});
    } else {
      this.doCreateSchedule();
    }
  }

  private doCreateSchedule() {
    this.createSchedulePromise = this.googleCalendarService
    .insertSchedule(this.startDate, this.scheduleModel, this.role)
    .then((response:any) => {
      let snackBarRef = this.snackBar.open(`${response.length} events created successfully`, 'Show event links', {
        duration: 10000,
      });
      snackBarRef.onAction().subscribe(() => {
        let dialogRef = this.dialog.open(EventsCreatedInfoDialog, {
          data: { response: response }
        });
      });
    })
    .catch((error:any) => {this.displayMessage(error)});
  }
}

@Component({
  selector: 'app-events-created-info-dialog',
  template: `
    <style>
      mat-dialog-actions {
        display:flex;
        justify-content:flex-end;
      }
      ul {
        list-style:none;
        padding-left:20px;
      }
      ::ng-deep .open-in-new {
        height:13px;
        position: relative;
        top: -10px;
      }
      ::ng-deep .open-in-new svg {
        fill:#A5A3A6;
      }
      ::ng-deep a:hover .open-in-new svg {
        fill:#df6e38;
      }
    </style>
    <h2 mat-dialog-title>Events links</h2>
    <mat-dialog-content>
      <ul *ngFor="let item of data.response">
        <li>
          <a href="{{item.result.htmlLink}}" target="_blank">{{item.result.htmlLink}}
            <mat-icon class="open-in-new" svgIcon="open-in-new"></mat-icon>
          </a>
        </li>
      </ul>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button mat-button color="primary" mat-dialog-close>Close</button>
    </mat-dialog-actions>`,
})
export class EventsCreatedInfoDialog {

  constructor(
    public dialogRef: MatDialogRef<EventsCreatedInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}