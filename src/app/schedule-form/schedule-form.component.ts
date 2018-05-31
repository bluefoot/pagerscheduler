import { Component, OnInit, Inject } from '@angular/core';

import { ScheduleModel } from '../schedule-model';
import { GoogleAuthenticationService } from '../google-authentication.service';
import { GoogleCalendarService } from '../google-calendar.service';
import { ScheduleService } from '../schedule.service';
import { Role } from '../schedule.service';
import { DayOfWeekPipe } from '../day-of-week.pipe';

import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {
  private _startDate : Date;
  private _scheduleModel : ScheduleModel;
  private _scheduleModelId : string;
  private _role : any;

  createSchedulePromise: Promise<any>;
  
  constructor(private scheduleService: ScheduleService, 
    public googleAuthenticationService: GoogleAuthenticationService,
    private googleCalendarService: GoogleCalendarService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private dayOfWeekPipe: DayOfWeekPipe,
    private bottomSheet: MatBottomSheet) { 
  }
  
  ngOnInit() {
    this.googleAuthenticationService.loadApiAndAuthenticateIfNeeded()
    .then((response:any) => {this.displayMessage('You are authenticated with Google')})
    // This should fail silently. Here's the code in case a message should've been shown
    //.catch((error:any) => {this.displayMessage(error)});
  }

  login() {
    this.googleAuthenticationService.login()
    .then(() => {this.displayMessage('Logged in successfully')})
    .catch((error:any) => {this.displayMessage(error)});
  }

  get invalidDateErrorMessage() {
    if(this.scheduleModel) {
      return `The selected model “${this.scheduleModel.title}” is supposed to start on a <strong>${this.dayOfWeekPipe.transform(this.scheduleModel.preferredDay)}</strong>`;
    } else {
      return '';
    }
  }
  
  validateDate() {
    if(this.startDate && this.scheduleModel) {
      if(this.scheduleModel.preferredDay!=moment(this.startDate).format('ddd')) {
        return false;
      }
    }
    return true;
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

  get startDate():Date {
    return this._startDate;
  }

  set startDate(value:Date) {
    this._startDate = value;
  }

  get scheduleModel():ScheduleModel {
    return this._scheduleModel;
  }

  set scheduleModel(value:ScheduleModel) {
    this._scheduleModel = value;
  }

  get role() {
    return this._role;
  }

  set role(value:any) {
    this._role = value;
  }

  getValues(map){
    return Array.from(map.values());
  }

  getScheduleModelTooltipText(schedule:ScheduleModel) {
    return `${schedule.caption} If you select this model, you should set the start date to a ${this.dayOfWeekPipe.transform(schedule.preferredDay)}, unless you are trying something out.`;
  }

  displayModelHelpDialog(schedule:ScheduleModel) {
    this.bottomSheet.open(ScheduleModelHelpSheet, {
      data: {message:this.getScheduleModelTooltipText(schedule)}
    });
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
    .catch((error:any) => {
      let errorMessage = 'Error: ' + error;
      if(error.result && error.result.error) {
        errorMessage = 'Error: ' + error.result.error.message;
      }
      this.displayMessage(errorMessage)
    });
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
}

@Component({
  selector: 'app-schedule-model-help-sheet',
  template: `
    <div style="background-color:white">
      <p [innerHtml]="data.message"></p>
      <a href="#" (click)="close($event)">
        <span mat-line>Close</span>
       </a>
    </div>
  `,
})
export class ScheduleModelHelpSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<ScheduleModelHelpSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  close(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}