// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Time {
  public static minutesToTimeStr(totalMinutes: number): string {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${Time.padToTwoDigits(hours)}:${Time.padToTwoDigits(minutes)}`;
  }

  private static padToTwoDigits(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
