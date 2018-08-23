export class Counter {
  public readonly id: string;
  public readonly name: string;
  private _value: number;

  constructor(data: {value: number; name?: string; id?: string} = {value: 0, name: '', id: ''}) {
    this.id = data.id || '' + Math.random();
    this.name = data.name || this.id;
    this._value = data.value;
  }

  public get value(): number {
    return this._value;
  }

  public inc(): Counter {
    ++this._value;
    return this;
  }

  public dec(): Counter {
    --this._value;
    return this;
  }
}
