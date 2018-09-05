import {UUIDService} from 'src/_shared/UUIDService';

export class AppEvent {
  id: string;
  event: string;
  payload: any;

  constructor(event: string, payload?: any) {
    this.id = UUIDService.generate();
    this.event = event;
    this.payload = payload;
  }
}
