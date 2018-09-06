import {UUIDService} from '../UUIDService';

interface ITraining {
  id?: string;
  date?: number;

  name: string;

  pace: number;
  distance: number;
  time: number;
}

const DEFAULT_DATA: ITraining = {
  name: '',
  pace: 0,
  distance: 0,
  time: 0
};

export class Training {
  public id: string;
  public date: number;

  name: string;

  public pace: number;
  public distance: number;
  public time: number;

  constructor(data: ITraining | null = DEFAULT_DATA) {
    if (!data) {
      data = {...DEFAULT_DATA};
    }
    this.id = data.id || UUIDService.generate();
    this.date = data.date || Date.now();

    this.name = data.name || this.id;

    this.pace = data.pace;
    this.distance = data.distance;
    this.time = data.time;
  }

  theSame(training: Training | null): boolean {
    return !!training && this.id === training.id;
  }
}
