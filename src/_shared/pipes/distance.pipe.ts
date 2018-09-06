export function DistancePipe(input: number): string {
  return '' + (input / 1000);
}

export function DistanceRevertPipe(input: string): number {
  return +input * 1000;
}
