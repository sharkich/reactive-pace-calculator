export class Counter {
  public readonly id: string;
  public readonly name: string;
  private _value: number;

  constructor(data: {value: number; name?: string} = {value: 0, name: ''}) {
    this.id = '' + Math.random();
    this.name = data.name || this.id;
    this._value = data.value;
  }

  public get value(): number {
    return this._value;
  }

  public inc(): number {
    ++this._value;
    return this._value;
  }

  public dec(): number {
    --this._value;
    return this._value;
  }

}
