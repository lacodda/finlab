// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class List {
  public static * chunks<T>(arr: T[], n: number): Generator<T[], void> {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  public static sum(arr: number[]): number {
    return arr.reduce((acc, num) => acc + num, 0);
  }
}
