import { Injectable } from '@angular/core';

import { ScheduleModel } from './schedule-model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private _schedules : Map<String, ScheduleModel>;
  private _activeSchedules : Map<String, ScheduleModel>;

  constructor() {
    this._schedules = new Map<String, ScheduleModel>();
    this._activeSchedules = new Map<String, ScheduleModel>();
    let classicSM : ScheduleModel = new ScheduleModel();
    classicSM.title = 'Classic';
    classicSM.active = false;
    classicSM.image = 'model-classic';
    classicSM.caption = '[Deprecated] Classic Schedule. Starts on Tuesday 14 MT, handover every day at 14 MT. No longer used as of March 2018.';
    classicSM.preferredDay = 'Tue';
    let classicSMSchedule = [
      {personA : {start:'20:00', duration:24}, personB : {}, full: {start:'20:00', duration:168}},   //tue
      {personA : {}, personB : {start:'20:00', duration:24}, full: {}},   //wed
      {personA : {start:'20:00', duration:24}, personB : {}, full: {}},   //thu
      {personA : {}, personB : {start:'20:00', duration:24}, full: {}},   //fri
      {personA : {start:'20:00', duration:24}, personB : {}, full: {}},   //sat
      {personA : {}, personB : {start:'20:00', duration:24}, full: {}},   //sun
      {personA : {start:'20:00', duration:24}, personB : {}, full: {}},   //mon
      {personA : {}, personB : {}, full: {}}                              //tue
    ];
    classicSM.schedule = classicSMSchedule;
    this._schedules.set(classicSM.title, classicSM);
  
    let secondQ2018SM : ScheduleModel = new ScheduleModel();
    secondQ2018SM.title = '2Q2018';
    secondQ2018SM.active = false;
    secondQ2018SM.image = 'model-2q2018';
    secondQ2018SM.caption = '[Deprecated] Used from April to June 2018. Starts on Monday 0H BRT, handover mostly at 0H BRT with some exceptions.';
    secondQ2018SM.preferredDay = 'Mon';
    let secondQ2018SMSchedule = [
      {personA : {start:'03:00', duration:18}, personB : {start:'21:00', duration:30}, full: {start:'03:00', duration:168}},   //mon
      {personA : {}, personB : {}, full: {}},                                                       //tue
      {personA : {start:'03:00', duration:24}, personB : {}, full: {}},                             //wed
      {personA : {}, personB : {start:'03:00', duration:24}, full: {}},                             //thu
      {personA : {start:'03:00', duration:24}, personB : {}, full: {}},                             //fri
      {personA : {}, personB : {start:'03:00', duration:24}, full: {}},                             //sat
      {personA : {start:'03:00', duration:24}, personB : {}, full: {}},                             //sun
      {personA : {}, personB : {}, full: {}},                                                       //mon
    ];
    secondQ2018SM.schedule = secondQ2018SMSchedule;
    this._schedules.set(secondQ2018SM.title, secondQ2018SM);

    let thirdQ2018SM : ScheduleModel = new ScheduleModel();
    thirdQ2018SM.title = '3Q2018';
    thirdQ2018SM.active = true;
    thirdQ2018SM.image = 'model-2q2018';
    thirdQ2018SM.caption = 'Schedule from July 2018 onwards. Starts on Monday 0H BRT, handover mostly at 0H BRT.';
    thirdQ2018SM.preferredDay = 'Mon';
    let thirdQ2018SMSchedule = [
      {personA : {start:'03:00', duration:18}, personB : {start:'21:00', duration:6}, full: {start:'03:00', duration:168}},   //mon
      {personA : {start:'03:00', duration:24}, personB : {}, full: {}},                                                       //tue
      {personA : {}, personB : {start:'03:00', duration:24}, full: {}},                             //wed
      {personA : {start:'03:00', duration:24}, personB : {}, full: {}},                             //thu
      {personA : {}, personB : {start:'03:00', duration:24}, full: {}},                             //fri
      {personA : {start:'03:00', duration:24}, personB : {}, full: {}},                             //sat
      {personA : {}, personB : {start:'03:00', duration:24}, full: {}},                             //sun
      {personA : {}, personB : {}, full: {}},                                                       //mon
    ];
    thirdQ2018SM.schedule = thirdQ2018SMSchedule;
    this._schedules.set(thirdQ2018SM.title, thirdQ2018SM);
    this._activeSchedules.set(thirdQ2018SM.title, thirdQ2018SM);
  }

  public get schedules() : Map<String, ScheduleModel> {
    return this._schedules;
  }

  public get activeSchedules() : Map<String, ScheduleModel> {
    return this._activeSchedules;
  }
}

//FIXME create a class Role, and here a method getAllRoles()
export const Role = {
  Full : {description : 'Full shift', image : 'role-full'},
  PersonA : {description : 'Person A', image : 'role-a'},
  PersonB : {description : 'Person B', image : 'role-b'}
}