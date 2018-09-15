import {UUIDService} from '../helpers/UUIDService';

interface ITraining {
  id?: string;
  date?: number;

  name: string;

  pace: number;
  distance: number;
  time: number;

  valid?: boolean;
}

const DEFAULT_DATA: ITraining = {
  name: '(noname)',
  pace: 500.0,
  distance: 10000,
  time: 0,
  valid: false
};

export class Training {
  public id: string;
  public date: number;

  name: string;

  public pace: number;
  public distance: number;
  public time: number;

  public valid: boolean;

  constructor(data: ITraining | null = DEFAULT_DATA) {
    if (!data) {
      data = {...DEFAULT_DATA};
    }

    this.id = data.id || UUIDService.generate();
    this.date = data.date || Date.now();

    this.name = data.name;

    this.pace = data.pace;
    this.distance = data.distance;
    this.time = data.time;

    this.valid = !!data.valid;
  }

  theSame(training: Training | null): boolean {
    return !!training && this.id === training.id;
  }
}
