import { expect } from "chai";
import { inputSamples } from "../data/input-samples";
import { PathFinder } from "../src/path/pathFinder";
import { Map } from "../src/map/map";

describe("PathFinder Acceptance Tests", () => {
  let pathFinder;

  beforeEach(() => {
    pathFinder = new PathFinder();
  });

  it("should return valid path and letters for basic example", () => {
    const map = new Map(inputSamples.input1);

    const { path, letters } = pathFinder.findPath(map);
    const expectedLetters = "ACB";
    const expectedPath = "@---A---+|C|+---+|+-B-x";

    expect(letters).to.equal(expectedLetters);
    expect(path).to.equal(expectedPath);
  });

  it("should return valid path and letters when needs to go straight through intersections", () => {
    const map = new Map(inputSamples.input2);
    const { path, letters } = pathFinder.findPath(map);
    const expectedLetters = "ABCD";
    const expectedPath = "@|A+---B--+|+--C-+|-||+---D--+|x";

    expect(letters).to.equal(expectedLetters);
    expect(path).to.equal(expectedPath);
  });

  it("should return valid path and letters when letters are found on turns", () => {
    const map = new Map(inputSamples.input3);
    const { path, letters } = pathFinder.findPath(map);
    const expectedLetters = "ACB";
    const expectedPath = "@---A---+|||C---+|+-B-x";

    expect(letters).to.equal(expectedLetters);
    expect(path).to.equal(expectedPath);
  });

  it("should return valid path and letters when it shouldn't collect letters from the same location twice", () => {
    const map = new Map(inputSamples.input4);
    const { path, letters } = pathFinder.findPath(map);
    const expectedLetters = "GOONIES";
    const expectedPath = "@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x";

    expect(letters).to.equal(expectedLetters);
    expect(path).to.equal(expectedPath);
  });

  it("should return valid path and letters and keep direction in compact spaces", () => {
    const map = new Map(inputSamples.input5);
    const { path, letters } = pathFinder.findPath(map);
    const expectedLetters = "BLAH";
    const expectedPath = "@B+++B|+-L-+A+++A-+Hx";

    expect(letters).to.equal(expectedLetters);
    expect(path).to.equal(expectedPath);
  });

  it("should ignore stuff after end of the path", () => {
    const map = new Map(inputSamples.input6IgnoreAfterEndOfThePath);
    const pathFinder = new PathFinder();
    const { path, letters } = pathFinder.findPath(map);
    const expectedLetters = "AB";
    const expectedPath = "@-A--+|+-B--x";

    expect(letters).to.equal(expectedLetters);
    expect(path).to.equal(expectedPath);
  });

  it("should throw an error when missing start character", () => {
    const map = new Map(inputSamples.input7NoStartCharacter);
    expect(() => pathFinder.findPath(map)).to.throw(
      "Start symbol '@' not found on the map."
    );
  });

  it("should throw an error when missing end character", () => {
    const map = new Map(inputSamples.input8NoEndCharacter);
    expect(() => pathFinder.findPath(map)).to.throw(
      "End symbol 'x' not found on the map."
    );
  });

  it("should throw an error when found multiple start characters", () => {
    const map = new Map(inputSamples.input9MultipleStarts);
    expect(() => pathFinder.findPath(map)).to.throw(
      "Multiple start symbols '@' found on the map."
    );
  });

  it("should throw an error when fork found in the path", () => {
    const map = new Map(inputSamples.input11Fork);
    expect(() => pathFinder.findPath(map)).to.throw(
      "Invalid intersection found - multiple paths."
    );
  });

  it("should throw an error when path is broken", () => {
    const map = new Map(inputSamples.input12BrokenPath);
    expect(() => pathFinder.findPath(map)).to.throw(
      "No moves available, path broken."
    );
  });

  it("should throw an error when there are multiple starting paths", () => {
    const map = new Map(inputSamples.input13MultipleStartingPaths);
    expect(() => pathFinder.findPath(map)).to.throw("Multiple starting paths");
  });

  it("should throw an error when fake turn is found", () => {
    const map = new Map(inputSamples.input14FakeTurn);
    expect(() => pathFinder.findPath(map)).to.throw(
      "Invalid intersection found - fake turn."
    );
  });
});
