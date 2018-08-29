import {UUIDService} from './uuid.service';

export interface ITraining {
  id?: string;
  date?: number;

  name: string;

  pace: number;
  distance: number;
  time: number;
}

export type Trainings = Map<string, Training>;

export class Training {
  public id: string;
  public date: number;

  name: string;

  public pace: number;
  public distance: number;
  public time: number;

  constructor(data: ITraining = {name: '', pace: 0, distance: 0, time: 0}) {
    this.id = data.id || UUIDService.generate();
    this.date = data.date || Date.now();

    this.name = data.name || this.id;

    this.pace = data.pace;
    this.distance = data.distance;
    this.time = data.time;
  }
}
