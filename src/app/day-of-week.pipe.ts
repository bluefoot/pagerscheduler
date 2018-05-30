import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {

  static weekday:any = {
    mon:'Monday', tue:'Tuesday', wed:'Wednesday', thu:'Thursday', fri:'Friday', sat:'Saturday', sun:'Sunday'
  };

  transform(value: string, args?: any): any {
    return DayOfWeekPipe.weekday[value.toLowerCase()] || value;
  }

}
