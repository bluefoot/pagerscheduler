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
      classicSM.caption = 'Classic Schedule. Starts on tuesday 14 MT, handover every day at 14 MT';
      let classicSMSchedule = [
        {personA : ['20:00', '23:59'], personB : []},                   //tue
        {personA : ['00:00', '19:59'], personB : ['20:00', '23:59']},   //wed
        {personB : ['00:00', '19:59'], personA : ['20:00', '23:59']},   //thu
        {personA : ['00:00', '19:59'], personB : ['20:00', '23:59']},   //fri
        {personB : ['00:00', '19:59'], personA : ['20:00', '23:59']},   //sat
        {personA : ['00:00', '19:59'], personB : ['20:00', '23:59']},   //sun
        {personB : ['00:00', '19:59'], personA : ['20:00', '23:59']},   //mon
        {personA : ['00:00', '19:59'], personB : []},                   //tue
      ];
      classicSM.schedule = classicSMSchedule;
      this.SCHEDULES.set(classicSM.title, classicSM);

      let secondQ2018SM : ScheduleModel = new ScheduleModel();
      secondQ2018SM.title = '2Q2018';
      secondQ2018SM.image = 'model-2q2018';
      secondQ2018SM.caption = 'Schedule from 2Q2018. Starts on Monday 0H BRT, handover mostly at 0H BRT with some exceptions';
      let secondQ2018SMSchedule = [
        {personA : ['03:00', '20:59'], personB : ['21:00', '23:59']},   //mon
        {personB : ['00:00', '23:59'], personA : []},                   //tue
        {personB : ['00:00', '02:59'], personA : ['03:00', '23:59']},   //wed
        {personA : ['00:00', '02:59'], personB : ['03:00', '23:59']},   //thu
        {personB : ['00:00', '02:59'], personA : ['03:00', '23:59']},   //fri
        {personA : ['00:00', '02:59'], personB : ['03:00', '23:59']},   //sat
        {personB : ['00:00', '02:59'], personA : ['03:00', '23:59']},   //sun
        {personA : ['00:00', '02:59'], personB : []},                   //mon
      ];
      secondQ2018SM.schedule = secondQ2018SMSchedule;
      this.SCHEDULES.set(secondQ2018SM.title, secondQ2018SM);
    }

    return this.SCHEDULES;
  }


}

export const Role = {
  Full : {description : 'Full shift', image : 'role-full'},
  PersonA : {description : 'Person A', image : 'role-a'},
  PersonB : {description : 'Person B', image : 'role-b'}
}