/* tslint:disable:no-bitwise */

export class UUIDService {

  static generate(): string {
    let date: number = new Date().getTime();
    const uuid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
      const r: number = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

}
