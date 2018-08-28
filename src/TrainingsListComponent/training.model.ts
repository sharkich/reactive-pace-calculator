import {UUIDService} from '../_shared/uuid.service';

export interface ITraining {
  id?: string;
  date?: number;

  pace: number;
  distance: number;
  time: number;
}

export type Trainings = Map<string, Training>;

export class Training {
  public id: string;
  public date: number;

  public pace: number;
  public distance: number;
  public time: number;

  constructor(data: ITraining = {pace: 0, distance: 0, time: 0}) {
    this.id = data.id || UUIDService.generate();
    this.date = data.date || Date.now();

    this.pace = data.pace;
    this.distance = data.distance;
    this.time = data.time;
  }

}
