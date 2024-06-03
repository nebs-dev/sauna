import { expect } from "chai";
import { MapValidator } from "../../src/map/mapValidator";
import { PathFinder } from "../../src/path/pathFinder";
import { inputSamples } from "../../data/input-samples";
import { Map } from "../../src/map/map";

describe("PathFinder", () => {
  let grid;
  let map;
  let mapValidator;

  beforeEach(() => {
    grid = inputSamples.input1;
    map = new Map(grid);
    mapValidator = new MapValidator();
  });

  describe("findPath", () => {
    it("should return valid path and letters", () => {
      const pathFinder = new PathFinder();
      const response = pathFinder.findPath(map);

      expect(response.path).to.equal("@---A---+|C|+---+|+-B-x");
      expect(response.letters).to.equal("ACB");
    });

    it("should return valid path and letters for input2", () => {
      grid = inputSamples.input2;
      map = new Map(grid);
      const pathFinder = new PathFinder();
      const response = pathFinder.findPath(map);

      expect(response.path).to.equal("@|A+---B--+|+--C-+|-||+---D--+|x");
      expect(response.letters).to.equal("ABCD");
    });

    it("should throw an error if there is no start character", () => {
      grid = inputSamples.input7NoStartCharacter;
      map = new Map(grid);

      const pathFinder = new PathFinder();

      expect(() => pathFinder.findPath(map)).to.throw(
        "Start symbol '@' not found on the map."
      );
    });
  });

  describe("move", () => {
    it("should move on the map", () => {
      const pathFinder = new PathFinder();
      const start = map.findSymbols("@")[0];
      const path = [];
      const letters = [];
      pathFinder.move(map, start, path, letters);

      expect(path).to.eql([
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
      ]);
    });

    it("should return true if the character is 'x'", () => {
      const pathFinder = new PathFinder();
      const start = map.findSymbols("@")[0];
      const path = [];
      const letters = [];
      const result = pathFinder.move(map, start, path, letters);

      expect(result).to.be.true;
    });
  });

  describe("makeMove", () => {
    it("should make the next move and return true", () => {
      const pathFinder = new PathFinder();
      const currentPosition = { x: 0, y: 1 };
      const prevPosition = { x: 0, y: 0 };
      const nextMove = { x: 0, y: 2 };
      const mapValidator = new MapValidator();
      const path = ["@", "-"];
      const letters = [];

      const result = pathFinder.makeMove(
        map,
        mapValidator,
        nextMove,
        currentPosition,
        path,
        letters,
        prevPosition
      );

      expect(result).to.be.true;
    });

    it("should return false if the next move is invalid", () => {
      const pathFinder = new PathFinder();
      const currentPosition = { x: 0, y: 1 };
      const prevPosition = { x: 0, y: 0 };
      const nextMove = { x: 0, y: 3 };
      const mapValidator = new MapValidator();
      const path = ["@", "-"];
      const letters = [];

      const result = pathFinder.makeMove(
        map,
        mapValidator,
        nextMove,
        currentPosition,
        path,
        letters,
        prevPosition
      );

      expect(result).to.be.false;
    });
  });
});
