import { Map } from "../map/map";
import { MapValidator } from "../map/mapValidator";
import { LettersRecorder } from "./lettersRecorder";
import { PathRecorder } from "./pathRecorder";

export interface PathFinderResponse {
  path: string;
  letters: string;
}

export class PathFinder {
  /**
   * Find the path on the map
   */
  public findPath(map: Map): PathFinderResponse {
    const path: string[] = [];
    const letters: string[] = [];

    const mapValidator = new MapValidator();
    mapValidator.validateMap(map);

    const start = map.findSymbols("@")[0];
    this.move(map, start, path, letters);

    const pathRecorder = new PathRecorder();
    const recordedPath: string = pathRecorder.recordPath(path);
    const lettersRecorder = new LettersRecorder();
    const recordedLetters: string = lettersRecorder.recordLetters(letters);

    return { path: recordedPath, letters: recordedLetters };
  }

  /**
   * Move on the map
   */
  move(
    map: Map,
    currentPos: { x: number; y: number },
    path: string[],
    letters: string[] = [],
    prevPosition?: { x: number; y: number }
  ): boolean {
    const currentChar = map.getCharacter(currentPos.x, currentPos.y);
    const mapValidator = new MapValidator();

    if (!map.isVisited(currentPos.x, currentPos.y)) {
      letters.push(currentChar);
    }

    path.push(currentChar);
    map.markVisited(currentPos.x, currentPos.y);
    map.updateCurrentPosition(currentPos.x, currentPos.y);

    if (currentChar === "x") {
      return true;
    }

    const moves = map.getMoves();

    // Validate current position
    if (prevPosition) {
      mapValidator.validateCurrentPosition(map, prevPosition);
    }

    // Check if there is a straight move available and make one if possible
    if (
      prevPosition &&
      map.isIntersection(currentChar) &&
      map.moveStraightAvailable(prevPosition)
    ) {
      const nextMove = map.getNextStraightMove(prevPosition);

      if (
        this.makeMove(
          map,
          mapValidator,
          nextMove,
          currentPos,
          path,
          letters,
          prevPosition
        )
      ) {
        return true;
      }
    }

    // Make a move in any available direction
    for (const nextMove of moves) {
      if (
        this.makeMove(
          map,
          mapValidator,
          nextMove,
          currentPos,
          path,
          letters,
          prevPosition
        )
      ) {
        return true;
      }
    }

    path.pop();
    letters.pop();
    return false;
  }

  /**
   * Make a move on the map
   */
  makeMove(
    map: Map,
    mapValidator: MapValidator,
    nextMove: { x: number; y: number },
    currentPos: { x: number; y: number },
    path: string[],
    letters: string[],
    prevPosition?: { x: number; y: number }
  ): boolean {
    if (
      mapValidator.validateNextMove(map, nextMove) &&
      mapValidator.isValidDirection(map, nextMove, currentPos, prevPosition)
    ) {
      return this.move(map, nextMove, path, letters, currentPos);
    }
    return false;
  }
}
