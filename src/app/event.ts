export class Event {
  private _start:Date;
  private _end:Date;
  private _duration:number;

  constructor(private __start:Date, private __end:Date, 
    private __duration:number){
    this.start = __start;
    this.end = __end;
    this.duration = __duration;
  }

  get start():Date {
    return this._start;
  }

  set start(value:Date) {
    this._start = value;
  }

  get end():Date {
    return this._end;
  }

  set end(value:Date) {
    this._end = value;
  }

  get duration():number {
    return this._duration;
  }

  set duration(value:number) {
    this._duration = value;
  }
}
