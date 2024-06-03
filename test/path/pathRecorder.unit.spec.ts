import { expect } from "chai";
import { PathRecorder } from "../../src/path/pathRecorder";
import { inputSamples } from "../../data/input-samples";
import { PathFinder, PathFinderResponse } from "../../src/path/pathFinder";
import { Map } from "../../src/map/map";

describe("PathRecorder", () => {
  describe("recordPath", () => {
    it("should record the path", () => {
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

      const pathRecorder = new PathRecorder();
      const recordedPath: string = pathRecorder.recordPath(path);

      expect(recordedPath).to.equal("@---A---+|C|+---+|+-B-x");
    });
  });
});
