import { expect } from "chai";
import { PathRecorder } from "../../src/path/pathRecorder";
import { inputSamples } from "../../data/input-samples";
import { PathFinder, PathFinderResponse } from "../../src/path/pathFinder";
import { Map } from "../../src/map/map";
import { LettersRecorder } from "../../src/path/lettersRecorder";

describe("LettersRecorder", () => {
  describe("recordLetters", () => {
    it("should record the letter", () => {
      const path = [
        "@",
        "-",
        "-",
        "-",
        "A",
        "-",
        "-",
        "-",
        "+",
        "|",
        "C",
        "|",
        "+",
        "-",
        "-",
        "-",
        "+",
        "|",
        "+",
        "-",
        "B",
        "-",
        "x",
      ];

      const lettersRecorder = new LettersRecorder();
      const recordedLetters = lettersRecorder.recordLetters(path);

      expect(recordedLetters).to.equal("ACB");
    });
  });
});
