import { Map } from "./map";

export class MapValidator {
  /**
   * Validate the map
   */
  public validateMap(map: Map): boolean {
    this.validateStart(map);
    this.validateEnd(map);

    return true;
  }

  /**
   * Validate if the position is valid
   */
  isValidMove(map: Map, x: number, y: number): boolean {
    return map.isValidPosition(x, y) && map.getCharacter(x, y) !== " ";
  }

  /**
   * Validate if the start symbol '@' is present on the map
   * and if there are multiple starting paths
   * and if you can start in the multiple directions
   */
  private validateStart(map: Map): void {
    const start = map.findSymbols("@");

    if (!start) {
      throw new Error("Start symbol '@' not found on the map.");
    }

    if (start.length > 1) {
      throw new Error("Multiple start symbols '@' found on the map.");
    }

    map.updateCurrentPosition(start[0].x, start[0].y);

    // check if you can start in the multiple directions
    const availableMoves = [];
    for (const possibleMove of map.getMoves()) {
      if (this.validateNextMove(map, possibleMove)) {
        availableMoves.push(possibleMove);
      }
    }

    if (availableMoves.length > 1) {
      throw new Error("Multiple starting paths found.");
    }
  }

  /**
   * Validate if the end symbol 'x' is present on the map
   */
  private validateEnd(map: Map): void {
    const end = map.findSymbols("x");
    if (!end) {
      throw new Error("End symbol 'x' not found on the map.");
    }
  }

  /**
   * Validate if the next move is valid
   */
  public validateNextMove(
    map: Map,
    nextMove: { x: number; y: number }
  ): boolean {
    return this.isValidMove(map, nextMove.x, nextMove.y);
  }

  /**
   * Validate if the intersection is valid
   */
  public validateIntersection(
    map: Map,
    prevPosition: { x: number; y: number }
  ): boolean {
    if (!this.validateIntersectionAvailableMoves(map, prevPosition)) {
      return false;
    }

    if (
      map.getCharacter(map.currentPosition.x, map.currentPosition.y) === "+"
    ) {
      this.validateIntersectionFakeTurn(map, prevPosition);
    }

    return true;
  }

  /**
   * Validate if the intersection has multiple available moves
   */
  validateIntersectionAvailableMoves(
    map: Map,
    prevPosition: { x: number; y: number }
  ): boolean {
    if (map.moveStraightAvailable(prevPosition)) return true;

    const availableMoves = [];
    for (const move of map.getMoves()) {
      if (this.validateNextMove(map, move) && !map.isVisited(move.x, move.y)) {
        availableMoves.push(move);
      }
    }

    if (availableMoves.length > 1) {
      return false;
    }

    return true;
  }

  /**
   * Validate if the intersection is a fake turn
   */
  validateIntersectionFakeTurn(
    map: Map,
    prevPosition: { x: number; y: number }
  ): boolean {
    if (!map.hasMovesLeftAndRight(prevPosition)) {
      throw new Error("Invalid intersection found - fake turn.");
    }

    return true;
  }

  /**
   * Validate the current position
   */
  validateCurrentPosition(
    map: Map,
    prevPosition: { x: number; y: number } | undefined
  ): boolean {
    const currentChar = map.getCharacter(
      map.currentPosition.x,
      map.currentPosition.y
    );

    // Validate intersection (fork in path)
    if (map.isIntersection(currentChar) && prevPosition) {
      if (!this.validateIntersection(map, prevPosition)) {
        throw new Error("Invalid intersection found - multiple paths.");
      }
    }

    // Validate if there are available moves
    if (!this.validateAvailableMoves(map, prevPosition)) {
      throw new Error("No moves available, path broken.");
    }

    return true;
  }

  /**
   * Validate if there are available moves
   */
  validateAvailableMoves(
    map: Map,
    prevPosition: { x: number; y: number }
  ): boolean {
    const availableMoves = [];
    for (const move of map.getMoves()) {
      if (
        (move.x !== prevPosition.x || move.y !== prevPosition.y) &&
        this.validateNextMove(map, move)
      ) {
        availableMoves.push(move);
      }
    }

    if (availableMoves.length === 0) {
      return false;
    }

    return true;
  }

  /**
   * Validate if the direction is valid
   */
  isValidDirection(
    map: Map,
    move: { x: number; y: number },
    currentPosition: { x: number; y: number },
    prevPosition: { x: number; y: number } | undefined
  ): boolean {
    const currentChar = map.getCharacter(currentPosition.x, currentPosition.y);

    if (!prevPosition) {
      return true;
    }

    if (move.x === prevPosition.x && move.y === prevPosition.y) {
      return false;
    }

    if (
      map.isMovingHorizontally(prevPosition) ||
      map.isIntersection(currentChar)
    ) {
      if (
        move.x === currentPosition.x &&
        (move.y === currentPosition.y + 1 || move.y === currentPosition.y - 1)
      ) {
        return true;
      }
    }

    if (
      map.isMovingVertically(prevPosition) ||
      map.isIntersection(currentChar)
    ) {
      if (
        move.y === currentPosition.y &&
        (move.x === currentPosition.x + 1 || move.x === currentPosition.x - 1)
      ) {
        return true;
      }
    }

    return false;
  }
}
