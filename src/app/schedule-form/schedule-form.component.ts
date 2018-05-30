import { Component, OnInit } from '@angular/core';

import { ScheduleModel } from '../schedule-model';
import { GoogleAuthenticationService } from '../google-authentication.service';
import { GoogleCalendarService } from '../google-calendar.service';
import { ScheduleService } from '../schedule.service';
import { Role } from '../schedule.service';

import { MatSnackBar } from '@angular/material';


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
  
  constructor(private scheduleService: ScheduleService, 
    private googleAuthenticationService: GoogleAuthenticationService,
    private googleCalendarService: GoogleCalendarService,
    public snackBar: MatSnackBar) { 
  }
  
  ngOnInit() {
    this.googleAuthenticationService.loadApiAndAuthenticateIfNeeded()
    // .then((response:any) => {/*console.log(response)*/})
    .catch((error:any) => {this.displayError(error)});
  }

  displayError(msg:string) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
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
    this.googleCalendarService.insertSchedule(this.startDate, this.scheduleModel, this.role);
  }
}
