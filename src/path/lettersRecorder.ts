export class LettersRecorder {
  public recordLetters(path: string[]): string {
    const joinedPath = path.join("");

    return joinedPath
      .split("")
      .filter((char) => /[A-Z]/.test(char))
      .join("");
  }
}
