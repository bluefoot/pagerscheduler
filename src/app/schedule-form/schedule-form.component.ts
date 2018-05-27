import { Component, OnInit } from '@angular/core';

import { ScheduleModel } from '../schedule-model';
import { ScheduleService } from '../schedule.service';
import { Role } from '../schedule.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {
  startDate : Date;
  scheduleModel : ScheduleModel;
  role : any;

  constructor(private scheduleService: ScheduleService) { }
  ngOnInit() { }

  get scheduleModels() {
    return this.scheduleService.getScheduleModels();
  }

  get roles() : Array<any> {
    return Object.values(Role);
  }

  getValues(map){
    return Array.from(map.values());
  }
}
