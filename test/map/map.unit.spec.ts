import { expect } from "chai";
import { Map } from "../../src/map/map";
import { MapValidator } from "../../src/map/mapValidator";
import { inputSamples } from "../../data/input-samples";

describe("Map", () => {
  let grid;
  let map;

  beforeEach(() => {
    grid = inputSamples.input1;
    map = new Map(grid);
  });

  describe("updateCurrentPosition", () => {
    it("should update the current position", () => {
      expect(map.currentPosition).to.eql({ x: 0, y: 0 });

      map.updateCurrentPosition(1, 1);
      expect(map.currentPosition).to.eql({ x: 1, y: 1 });
    });
  });

  describe("getCharacter", () => {
    it("should return the character at the given position", () => {
      expect(map.getCharacter(0, 0)).to.equal("@");
      expect(map.getCharacter(0, 1)).to.equal("-");
      expect(map.getCharacter(2, 2)).to.equal("B");
    });
  });

  describe("isValidPosition", () => {
    it("should return true if the position is valid", () => {
      expect(map.isValidPosition(0, 0)).to.be.true;
      expect(map.isValidPosition(2, 2)).to.be.true;
    });

    it("should return false if the position is invalid", () => {
      expect(map.isValidPosition(-1, 0)).to.be.false;
      expect(map.isValidPosition(0, -1)).to.be.false;
      expect(map.isValidPosition(0, 100)).to.be.false;
      expect(map.isValidPosition(100, 0)).to.be.false;
    });
  });

  describe("isVisited", () => {
    it("should return true if the position has been visited", () => {
      expect(map.isVisited(0, 1)).to.be.false;

      map.updateCurrentPosition(0, 1);
      map.markVisited(0, 1);
      expect(map.isVisited(0, 1)).to.be.true;
    });
  });

  describe("markVisited", () => {
    it("should mark the position as visited", () => {
      expect(map.isVisited(0, 1)).to.be.false;

      map.markVisited(0, 1);
      expect(map.isVisited(0, 1)).to.be.true;
    });
  });

  describe("hasMovesLeftAndRight", () => {
    it("should return true if there are moves left and right", () => {
      map.updateCurrentPosition(2, 4);
      expect(map.hasMovesLeftAndRight({ x: 2, y: 3 })).to.be.true;
    });

    it("should return false if there are no moves left and right", () => {
      map.updateCurrentPosition(0, 1);
      expect(map.hasMovesLeftAndRight({ x: 0, y: 0 })).to.be.false;
    });
  });

  describe("moveStraightAvailable", () => {
    it("should return true if there is a straight move available", () => {
      map.updateCurrentPosition(2, 3);
      expect(map.moveStraightAvailable({ x: 2, y: 2 })).to.be.true;
    });

    it("should return false if there is no straight move available", () => {
      map.updateCurrentPosition(0, 8);
      expect(map.moveStraightAvailable({ x: 0, y: 7 })).to.be.false;
    });
  });

  describe("isMovingHorizontally", () => {
    it("should return true if the movement is horizontal", () => {
      map.updateCurrentPosition(0, 1);
      expect(map.isMovingHorizontally({ x: 0, y: 0 })).to.be.true;
    });

    it("should return false if the movement is not horizontal", () => {
      map.updateCurrentPosition(1, 0);
      expect(map.isMovingHorizontally({ x: 0, y: 0 })).to.be.false;
    });
  });

  describe("isMovingVertically", () => {
    it("should return true if the movement is vertical", () => {
      map.updateCurrentPosition(1, 0);
      expect(map.isMovingVertically({ x: 0, y: 0 })).to.be.true;
    });

    it("should return false if the movement is not vertical", () => {
      map.updateCurrentPosition(0, 1);
      expect(map.isMovingVertically({ x: 0, y: 0 })).to.be.false;
    });
  });

  describe("isIntersection", () => {
    it("should return true if the position is an intersection", () => {
      expect(map.isIntersection("+")).to.be.true;
      expect(map.isIntersection("A")).to.be.true;
    });

    it("should return false if the position is not an intersection", () => {
      expect(map.isIntersection("-")).to.be.false;
    });
  });

  describe("getMoves", () => {
    it("should return the possible moves from the current position", () => {
      map.updateCurrentPosition(0, 0);
      expect(map.getMoves()).to.eql([
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
      ]);

      map.updateCurrentPosition(2, 2);
      expect(map.getMoves()).to.eql([
        { x: 1, y: 2 },
        { x: 3, y: 2 },
        { x: 2, y: 1 },
        { x: 2, y: 3 },
      ]);
    });
  });

  describe("findSymbols", () => {
    it("should return the symbols found in the grid", () => {
      expect(map.findSymbols("@")).to.eql([{ x: 0, y: 0 }]);
      expect(map.findSymbols("A")).to.eql([{ x: 0, y: 4 }]);
      expect(map.findSymbols("x")).to.eql([{ x: 2, y: 0 }]);
    });
  });

  describe("validatePosition", () => {
    it("should return true if the position is valid", () => {
      expect(map.validatePosition(0, 0)).to.be.true;
      expect(map.validatePosition(2, 2)).to.be.true;
    });

    it("should return false if the position is invalid", () => {
      expect(map.validatePosition(-1, 0)).to.be.false;
      expect(map.validatePosition(0, -1)).to.be.false;
      expect(map.validatePosition(0, 100)).to.be.false;
      expect(map.validatePosition(100, 0)).to.be.false;
    });
  });
});
