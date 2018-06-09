import { Component, OnInit, Inject } from '@angular/core';

import { ScheduleModel } from '../schedule-model';
import { GoogleCalendarService } from '../google-calendar.service';
import { EventPluralMappingService } from '../event-plural-mapping.service';
import { Event } from '../event';
import { SnackBarService } from '../snack-bar.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  private _startDate : Date;
  private _scheduleModel : ScheduleModel;
  private _scheduleModelId : string;
  private _role : any;
  private _schedule : Event[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PreviewComponent>,
    private googleCalendarService: GoogleCalendarService,
    private snackBarService:SnackBarService,
    public eventPluralMappingService:EventPluralMappingService) {
    if(data) {
      this.startDate = data.startDate;
      this.scheduleModel = data.scheduleModel;
      this.role = data.role;
    }
  }

  ngOnInit() {
    this.googleCalendarService.previewSchedule(this.startDate, this.scheduleModel, this.role)
    .then((result:Event[]) => {this.schedule = result})
    .catch((error:any) => {this.snackBarService.displayMessage(error)});
  }

  createSchedule() {
    this.dialogRef.close('create');
  }

  format(date:Date) {
    return moment(date).format('dddd, MMMM Do HH:mm');
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

  get schedule():Event[] {
    return this._schedule;
  }

  set schedule(value:Event[]) {
    this._schedule = value;
  }
}