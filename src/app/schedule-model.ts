export class ScheduleModel {
  private _image:string;
  private _title:string;
  private _caption:string;
  private _schedule:any[];
  private _preferredDay:string;

  get title() {
    return this._title;
  }

  set title(value:string) {
    this._title = value;
  }
  
  get image() {
    return this._image;
  }

  set image(value:string) {
    this._image = value;
  }

  get caption() {
    return this._caption;
  }

  set caption(value:string) {
    this._caption = value;
  }

  get schedule() {
    return this._schedule;
  }

  set schedule(value:any[]) {
    this._schedule=value;
  }

  get preferredDay() {
    return this._preferredDay;
  }

  set preferredDay(value:string) {
    this._preferredDay = value;
  }
}
