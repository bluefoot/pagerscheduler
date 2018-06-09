/**
 * Based on:
 * - https://github.com/stefanreichert/angular2-google-calendar-example
 * - https://developers.google.com/calendar/quickstart/js
 * - https://developers.google.com/calendar/create-events
 * - https://developers.google.com/api-client-library/javascript/features/promises
 */
import { Injectable } from '@angular/core';
import { ScheduleModel } from './schedule-model';
import { Role } from './schedule.service';
import { Event } from './event';
import * as moment from 'moment';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {

  constructor() { }

  previewSchedule(startDate : Date, scheduleModel : ScheduleModel, role : any):Promise<Event[]> {
    if(!scheduleModel || !scheduleModel.schedule) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
      try {
        let schedule:Event[] = [];
        for (var _i = 0; _i < scheduleModel.schedule.length; _i++) {
          let event:any = this.getEventForRole(role, scheduleModel.schedule[_i]);
          if(event.start) {
            // calculate start and end date
            let eventTimeSplitted = event.start.split(':');
            let hour = eventTimeSplitted[0];
            let minute = eventTimeSplitted[1];
            let eventStartDate = moment.utc(startDate).add(_i, 'days').hour(hour).minute(minute);
            let eventEndDate = moment(eventStartDate).add(event.duration, 'hour');
            schedule.push(new Event(eventStartDate.toDate(), eventEndDate.toDate(), event.duration));
          }
        }
        resolve(schedule);
      } catch (e) {
        reject('Unable to preview schedule: ' + e);
      }
    });
  }

  /**
   * Iterates over the ScheduleModel and creates the events, the first day
   * will be startDate.
   * @param startDate the start date to be considered as the first day of events
   * @param scheduleModel the selected schedule model
   * @param role the selected role
   */
  insertSchedule(startDate : Date, scheduleModel : ScheduleModel, role : any) {
    let promises = [];
    if(!scheduleModel || !scheduleModel.schedule) return Promise.reject('Malformed Schedule Model');
    for (var _i = 0; _i < scheduleModel.schedule.length; _i++) {
      let event:any = this.getEventForRole(role, scheduleModel.schedule[_i]);
      if(event.start) {
        // calculate start and end date
        let eventTimeSplitted = event.start.split(':');
        let hour = eventTimeSplitted[0];
        let minute = eventTimeSplitted[1];
        let eventStartDate = moment.utc(startDate).add(_i, 'days').hour(hour).minute(minute);
        let eventEndDate = moment(eventStartDate).add(event.duration, 'hour');

        // build google calendar request
        var gcalEvent = {
          'summary': 'PAGER',
          'start': {
            'dateTime': eventStartDate.format(), // ISO 8601
          },
          'end': {
            'dateTime': eventEndDate.format(),
          },
        };

        // create event
        promises.push(this.createEvent(gcalEvent));
      }
    }
    return Promise.all(promises);
  }

  /**
   * Returns an event object from a ScheduleModel schedule based on a role.
   * The event object returned has two fields: 
   * - start the start time in HH:MM
   * - duration the duration in hours of the event (it might overlap to next day)
   * @param role the role
   * @param schedule a schedule taken from ScheduleModel#schedule
   * @see ScheduleModel#schedule
   */
  getEventForRole(role:any, schedule:any) {
    if(role==Role.PersonA) {
      return schedule.personA;
    } else if(role==Role.PersonB) {
      return schedule.personB;
    } else if(role==Role.Full) {
      return schedule.full;
    }
  }

  /**
   * Creates an event on Google Calendar
   * @param event a set of event fields. See https://developers.google.com/calendar/v3/reference/events
   */
  private createEvent(event:any): Promise<any> {
    try {
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });
      return request;
    } catch (e) {
      return Promise.reject('Unable to create event: ' + e);
    }
    /* Old syntax:
      request.execute(function(event) {
        console.log('Event created: ' + event.htmlLink);
      });
    */
  }

  /**
   * Loads the 10 next appointments. This is not used in this app, it's just for test.
   */
  private loadAppointments() {
    return new Promise((resolve, reject) => {
      var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      });

      request.execute((resp) => {
        var appointments = [];
        var events = resp.items;
        var i;
        if (events.length > 0) {
          for (i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            appointments.push(event.summary + ' (' + when + ')')
          }
        } else {
          appointments.push('No upcoming events found.');
        }
        resolve(appointments);
      });
    });
  }
}
