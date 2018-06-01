import { Component, OnInit, Inject } from '@angular/core';

import { ScheduleModel } from '../schedule-model';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<PreviewComponent>) {
    if(data) {
      this.startDate = data.startDate;
      this.scheduleModel = data.scheduleModel;
      this.role = data.role;
    }
  }

  ngOnInit() {}

  createSchedule() {
    this.dialogRef.close('create');
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
}