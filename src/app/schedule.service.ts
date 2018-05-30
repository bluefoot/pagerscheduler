import { Injectable } from '@angular/core';

import { ScheduleModel } from './schedule-model';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private SCHEDULES : Map<String, ScheduleModel>;

  constructor() { }

  public getScheduleModels() : Map<String, ScheduleModel> {
    if(!this.SCHEDULES) {
      this.SCHEDULES = new Map<String, ScheduleModel>();
      let classicSM : ScheduleModel = new ScheduleModel();
      classicSM.title = 'Classic';
      classicSM.image = 'model-classic';
      classicSM.caption = 'Classic Schedule. Starts on Tuesday 14 MT, handover every day at 14 MT. No longer used as of March 2018.';
      classicSM.preferredDay = 'Tue';
      let classicSMSchedule = [
        {personA : {start:'20:00', duration:24}, personB : {}},   //tue
        {personA : {}, personB : {start:'20:00', duration:24}},   //wed
        {personA : {start:'20:00', duration:24}, personB : {}},   //thu
        {personA : {}, personB : {start:'20:00', duration:24}},   //fri
        {personA : {start:'20:00', duration:24}, personB : {}},   //sat
        {personA : {}, personB : {start:'20:00', duration:24}},   //sun
        {personA : {start:'20:00', duration:24}, personB : {}},   //mon
        {personA : {}, personB : {}}                              //tue
      ];
      classicSM.schedule = classicSMSchedule;
      this.SCHEDULES.set(classicSM.title, classicSM);

      let secondQ2018SM : ScheduleModel = new ScheduleModel();
      secondQ2018SM.title = '2Q2018';
      secondQ2018SM.image = 'model-2q2018';
      secondQ2018SM.caption = 'Schedule from 2Q2018. Starts on Monday 0H BRT, handover mostly at 0H BRT with some exceptions';
      secondQ2018SM.preferredDay = 'Mon';
      let secondQ2018SMSchedule = [
        {personA : {start:'03:00', duration:18}, personB : {start:'21:00', duration:30}},   //mon
        {personA : {}, personB : {}},                                                       //tue
        {personA : {start:'03:00', duration:24}, personB : {}},                             //wed
        {personA : {}, personB : {start:'03:00', duration:24}},                             //thu
        {personA : {start:'03:00', duration:24}, personB : {}},                             //fri
        {personA : {}, personB : {start:'03:00', duration:24}},                             //sat
        {personA : {start:'03:00', duration:24}, personB : {}},                             //sun
        {personA : {}, personB : {}},                                                       //mon
      ];
      secondQ2018SM.schedule = secondQ2018SMSchedule;
      this.SCHEDULES.set(secondQ2018SM.title, secondQ2018SM);
    }

    return this.SCHEDULES;
  }
}

//FIXME create a class Role, and here a method getAllRoles()
export const Role = {
  Full : {description : 'Full shift', image : 'role-full'},
  PersonA : {description : 'Person A', image : 'role-a'},
  PersonB : {description : 'Person B', image : 'role-b'}
}