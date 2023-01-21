export {};

declare global {
  interface Array<T> {
    // eslint-disable-next-line @typescript-eslint/method-signature-style
    findLastIndex(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: unknown
    ): number;

    // eslint-disable-next-line @typescript-eslint/method-signature-style
    findLast(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: unknown
    ): T | undefined;
  }
}
