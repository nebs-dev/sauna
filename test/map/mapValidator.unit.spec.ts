import { expect } from "chai";
import { Map } from "../../src/map/map";
import { MapValidator } from "../../src/map/mapValidator";

describe("MapValidator", () => {
  let mapValidator: MapValidator;

  beforeEach(() => {
    mapValidator = new MapValidator();
  });

  describe("validateMap", () => {
    it("should throw an error if start symbol is not found", () => {
      const grid = [
        ["-", "-", "-"],
        ["|", " ", "|"],
        ["x", "-", "-"],
      ];
      const map = new Map(grid);

      expect(() => mapValidator.validateMap(map)).to.throw(
        "Start symbol '@' not found on the map."
      );
    });

    it("should throw an error if multiple start symbols are found", () => {
      const grid = [
        ["-", "-", "-"],
        ["@", " ", "@"],
        ["x", "-", "-"],
      ];
      const map = new Map(grid);

      expect(() => mapValidator.validateMap(map)).to.throw(
        "Multiple start symbols '@' found on the map."
      );
    });

    it("should throw an error if multiple starting paths are found", () => {
      const grid = [
        ["-", "-", "-"],
        ["@", " ", "|"],
        ["x", "-", "-"],
      ];
      const map = new Map(grid);

      expect(() => mapValidator.validateMap(map)).to.throw(
        "Multiple starting paths found."
      );
    });
  });

  describe("isValidMove", () => {
    it("should return true if the move is valid", () => {
      const grid = [
        ["-", "-", "-"],
        ["|", " ", "|"],
        ["x", "-", "-"],
      ];
      const map = new Map(grid);

      expect(mapValidator.isValidMove(map, 1, 0)).to.be.true;
    });

    it("should return false if the move is invalid", () => {
      const grid = [
        ["-", "-", "-"],
        ["|", " ", "|"],
        ["x", "-", "-"],
      ];
      const map = new Map(grid);

      expect(mapValidator.isValidMove(map, 1, 1)).to.be.false;
    });
  });

  describe("validateNextMove", () => {
    it("should return true if the next move is valid", () => {
      const grid = [
        ["-", "-", "-"],
        ["|", " ", "|"],
        ["x", "-", "-"],
      ];
      const map = new Map(grid);

      expect(mapValidator.validateNextMove(map, { x: 1, y: 0 })).to.be.true;
    });

    it("should return false if the next move is invalid", () => {
      const grid = [
        ["-", "-", "-"],
        ["|", " ", "|"],
        ["x", "-", "-"],
      ];
      const map = new Map(grid);

      expect(mapValidator.validateNextMove(map, { x: 1, y: 1 })).to.be.false;
    });
  });

  describe("validateIntersection", () => {
    it("should return true if the intersection is valid", () => {
      const grid = [
        ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
      ];
      const map = new Map(grid);

      expect(mapValidator.validateIntersection(map, { x: 1, y: 0 })).to.be.true;
    });

    it("should return false if the intersection is a fork", () => {
      const grid = [
        [" ", " ", " ", " ", " ", "x", "-", "B"],
        [" ", " ", " ", " ", " ", " ", " ", "|"],
        ["@", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", "x", "+", " ", " ", " ", "C"],
        [" ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", "+", "-", "-", "-", "+"],
      ];

      const map = new Map(grid);
      map.updateCurrentPosition(2, 7);
      expect(mapValidator.validateIntersection(map, { x: 2, y: 6 })).to.be
        .false;
    });
  });

  describe("validateIntersectionAvailableMoves", () => {
    it("should return true if there is only one move in intersection excluding straight one", () => {
      const grid = [
        ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
      ];
      const map = new Map(grid);

      expect(
        mapValidator.validateIntersectionAvailableMoves(map, { x: 0, y: 8 })
      ).to.be.true;
    });

    it("should return false if there if intersection is a fork", () => {
      const grid = [
        [" ", " ", " ", " ", " ", "x", "-", "B"],
        [" ", " ", " ", " ", " ", " ", " ", "|"],
        ["@", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", "x", "+", " ", " ", " ", "C"],
        [" ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", "+", "-", "-", "-", "+"],
      ];
      const map = new Map(grid);
      map.updateCurrentPosition(2, 7);

      expect(
        mapValidator.validateIntersectionAvailableMoves(map, { x: 2, y: 6 })
      ).to.be.false;
    });
  });

  describe("validateIntersectionFakeTurn", () => {
    it("should throw an error if the intersection is a fake turn", () => {
      const grid = [["@", "-", "A", "-", "+", "-", "B", "-", "x"]];
      const map = new Map(grid);
      map.updateCurrentPosition(0, 4);

      expect(() =>
        mapValidator.validateIntersectionFakeTurn(map, { x: 0, y: 3 })
      ).to.throw("Invalid intersection found - fake turn.");
    });
  });

  describe("validateCurrentPosition", () => {
    it("should return true if the current position is valid", () => {
      const grid = [
        ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
      ];
      const map = new Map(grid);

      expect(mapValidator.validateCurrentPosition(map, { x: 0, y: 7 })).to.be
        .true;
    });

    it("should throw an error if the intersection is a fake turn", () => {
      const grid = [["@", "-", "A", "-", "+", "-", "B", "-", "x"]];
      const map = new Map(grid);
      map.updateCurrentPosition(0, 4);

      expect(() =>
        mapValidator.validateCurrentPosition(map, { x: 0, y: 3 })
      ).to.throw("Invalid intersection found - fake turn.");
    });

    it("should throw an error when path is broken.", () => {
      const grid = [
        ["@", "-", "-", "A", "-", "+"],
        [" ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", "B", "-", "x"],
      ];

      const map = new Map(grid);
      map.updateCurrentPosition(1, 5);

      expect(() =>
        mapValidator.validateCurrentPosition(map, { x: 0, y: 5 })
      ).to.throw("No moves available, path broken.");
    });
  });

  describe("validateAvailableMoves", () => {
    it("should return true if there are available moves", () => {
      const grid = [
        ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
      ];
      const map = new Map(grid);
      map.updateCurrentPosition(2, 4);

      expect(mapValidator.validateAvailableMoves(map, { x: 2, y: 3 })).to.be
        .true;
    });

    it("should throw an error if there are no available moves", () => {
      const grid = [
        ["@", "-", "-", "A", "-", "+"],
        [" ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", "B", "-", "x"],
      ];
      const map = new Map(grid);
      map.updateCurrentPosition(1, 5);

      expect(() =>
        mapValidator.validateCurrentPosition(map, { x: 0, y: 5 })
      ).to.throw("No moves available, path broken.");
    });
  });

  describe("isValidDirection", () => {
    it("should return true if the direction is valid", () => {
      const grid = [
        ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
      ];
      const map = new Map(grid);
      map.updateCurrentPosition(0, 4);

      expect(
        mapValidator.isValidDirection(
          map,
          { x: 0, y: 5 },
          { x: 0, y: 4 },
          { x: 0, y: 3 }
        )
      ).to.be.true;
    });

    it("should return false if the direction is invalid", () => {
      const grid = [
        ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
      ];
      const map = new Map(grid);
      map.updateCurrentPosition(1, 8);

      expect(
        mapValidator.isValidDirection(
          map,
          { x: 1, y: 7 },
          { x: 1, y: 8 },
          { x: 0, y: 8 }
        )
      ).to.be.false;
    });
  });
});
