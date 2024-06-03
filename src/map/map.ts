export class Map {
  public grid: string[][];
  public visited: boolean[][];
  public vertical: string = "-";
  public horizontal: string = "|";
  public intersection: string = "+";
  public currentPosition: { x: number; y: number };

  constructor(grid: string[][]) {
    this.grid = grid;
    this.visited = grid.map((row) => row.map(() => false));
    this.currentPosition = { x: 0, y: 0 };
  }

  /**
   * Update the current position on the map
   */
  updateCurrentPosition(x: number, y: number): void {
    this.currentPosition = { x, y };
  }

  /**
   * Get the character at the given position
   */
  getCharacter(x: number, y: number): string {
    return this.grid[x] && this.grid[x][y] !== undefined
      ? this.grid[x][y]
      : " ";
  }

  /**
   * Check if the given position is a valid position on the map
   */
  isValidPosition(x: number, y: number): boolean {
    return this.grid[x] !== undefined && this.grid[x][y] !== undefined;
  }

  /**
   * Check if the given position has been visited
   */
  isVisited(x: number, y: number): boolean {
    return this.visited[x] && this.visited[x][y];
  }

  /**
   * Mark the given position as visited
   */
  markVisited(x: number, y: number): void {
    if (this.visited[x] && this.visited[x][y] !== undefined) {
      this.visited[x][y] = true;
    }
  }

  /**
   * Check if there are possible moves left and right from the current position,
   * considering the direction of movement from the previous position.
   */
  hasMovesLeftAndRight(prevPosition: { x: number; y: number }): boolean {
    if (this.isMovingVertically(prevPosition)) {
      const leftAvailable =
        this.isValidPosition(
          this.getHorizontalMoveLeft().x,
          this.getHorizontalMoveLeft().y
        ) &&
        this.getCharacter(
          this.getHorizontalMoveLeft().x,
          this.getHorizontalMoveLeft().y
        ) !== " ";
      const rightAvailable =
        this.isValidPosition(
          this.getHorizontalMoveRight().x,
          this.getHorizontalMoveRight().y
        ) &&
        this.getCharacter(
          this.getHorizontalMoveRight().x,
          this.getHorizontalMoveRight().y
        ) !== " ";

      return leftAvailable || rightAvailable;
    }

    if (this.isMovingHorizontally(prevPosition)) {
      const leftAvailable =
        this.isValidPosition(
          this.getVerticalMoveUp().x,
          this.getVerticalMoveUp().y
        ) &&
        this.getCharacter(
          this.getVerticalMoveUp().x,
          this.getVerticalMoveUp().y
        ) !== " ";
      const rightAvailable =
        this.isValidPosition(
          this.getVerticalMoveDown().x,
          this.getVerticalMoveDown().y
        ) &&
        this.getCharacter(
          this.getVerticalMoveDown().x,
          this.getVerticalMoveDown().y
        ) !== " ";

      return leftAvailable || rightAvailable;
    }
  }

  moveStraightAvailable(prevPosition: { x: number; y: number }): boolean {
    if (this.isMovingHorizontally(prevPosition)) {
      return (
        this.isValidPosition(
          this.getHorizontalMoveLeft().x,
          this.getHorizontalMoveLeft().y
        ) &&
        this.isValidPosition(
          this.getHorizontalMoveRight().x,
          this.getHorizontalMoveRight().y
        ) &&
        this.getCharacter(
          this.getHorizontalMoveLeft().x,
          this.getHorizontalMoveLeft().y
        ) !== " " &&
        this.getCharacter(
          this.getHorizontalMoveRight().x,
          this.getHorizontalMoveRight().y
        ) !== " "
      );
    }

    if (this.isMovingVertically(prevPosition)) {
      return (
        this.isValidPosition(
          this.getVerticalMoveUp().x,
          this.getVerticalMoveUp().y
        ) &&
        this.isValidPosition(
          this.getVerticalMoveDown().x,
          this.getVerticalMoveDown().y
        ) &&
        this.getCharacter(
          this.getVerticalMoveUp().x,
          this.getVerticalMoveUp().y
        ) !== " " &&
        this.getCharacter(
          this.getVerticalMoveDown().x,
          this.getVerticalMoveDown().y
        ) !== " "
      );
    }

    return false;
  }

  /**
   * Get the next horizontal move to the left
   */
  getHorizontalMoveLeft = () => {
    return {
      x: this.currentPosition.x,
      y: this.currentPosition.y - 1,
    };
  };

  /**
   * Get the next horizontal move to the right
   */
  getHorizontalMoveRight = () => {
    return {
      x: this.currentPosition.x,
      y: this.currentPosition.y + 1,
    };
  };

  /**
   * Get the next vertical move up
   */
  getVerticalMoveUp = () => {
    return {
      x: this.currentPosition.x - 1,
      y: this.currentPosition.y,
    };
  };

  /**
   * Get the next vertical move down
   */
  getVerticalMoveDown = () => {
    return {
      x: this.currentPosition.x + 1,
      y: this.currentPosition.y,
    };
  };

  /**
   * Get the next straight move from the current position
   */
  getNextStraightMove(prevPosition: { x: number; y: number }): {
    x: number;
    y: number;
  } {
    const currentPosition = this.currentPosition;

    if (this.isMovingHorizontally(prevPosition)) {
      if (
        this.isValidPosition(currentPosition.x, currentPosition.y + 1) &&
        this.getCharacter(currentPosition.x, currentPosition.y + 1) !== " " &&
        this.currentPosition.y + 1 !== prevPosition.y
      ) {
        return { x: currentPosition.x, y: currentPosition.y + 1 };
      }

      if (
        this.isValidPosition(currentPosition.x, currentPosition.y - 1) &&
        this.getCharacter(currentPosition.x, currentPosition.y - 1) !== " " &&
        this.currentPosition.y - 1 !== prevPosition.y
      ) {
        return { x: currentPosition.x, y: currentPosition.y - 1 };
      }
    }

    if (this.isMovingVertically(prevPosition)) {
      if (
        this.isValidPosition(currentPosition.x + 1, currentPosition.y) &&
        this.getCharacter(currentPosition.x + 1, currentPosition.y) !== " " &&
        this.currentPosition.x + 1 !== prevPosition.x
      ) {
        return { x: currentPosition.x + 1, y: currentPosition.y };
      }

      if (
        this.isValidPosition(currentPosition.x - 1, currentPosition.y) &&
        this.getCharacter(currentPosition.x - 1, currentPosition.y) !== " " &&
        this.currentPosition.x - 1 !== prevPosition.x
      ) {
        return { x: currentPosition.x - 1, y: currentPosition.y };
      }
    }

    return null;
  }

  /**
   * Check if it is moving horizontally
   */
  isMovingHorizontally(prevPosition: { x: number; y: number }): boolean {
    return prevPosition.x === this.currentPosition.x;
  }

  /**
   * Check if it is moving vertically
   */
  isMovingVertically(prevPosition: { x: number; y: number }): boolean {
    return prevPosition.y === this.currentPosition.y;
  }

  /**
   * Check if the character is an intersection
   */
  isIntersection(character: string) {
    return character !== this.horizontal && character !== this.vertical;
  }


  /**
   * Get all possible moves from the current position
   */
  getMoves(): { x: number; y: number }[] {
    return [
      { x: this.currentPosition.x - 1, y: this.currentPosition.y }, // Up
      { x: this.currentPosition.x + 1, y: this.currentPosition.y }, // Down
      { x: this.currentPosition.x, y: this.currentPosition.y - 1 }, // Left
      { x: this.currentPosition.x, y: this.currentPosition.y + 1 }, // Right
    ];
  }

  /**
   * Find all the symbols on the map
   */
  findSymbols(symbol: string): { x: number; y: number }[] {
    const symbols: { x: number; y: number }[] = [];

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === symbol) {
          symbols.push({ x: i, y: j });
        }
      }
    }

    return symbols.length > 0 ? symbols : null;
  }

  validatePosition(x: number, y: number): boolean {
    return this.grid[x] !== undefined && this.grid[x][y] !== undefined;
  }
}
