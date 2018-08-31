export class AppEvent {
  event: string;
  payload: any;

  constructor(event: string, payload?: any) {
    this.event = event;
    this.payload = payload;
  }
}
