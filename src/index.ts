import { Map } from "./map/map";
import { PathFinder, PathFinderResponse } from "./path/pathFinder";
import { PathRecorder } from "./path/pathRecorder";
import { LettersRecorder } from "./path/lettersRecorder";

// Define the input map as a 2-dimensional array of characters
const inputMap: string[][] = [
  [" ", "+", "-", "L", "-", "+"],
  [" ", "|", " ", " ", "+", "A", "-", "+"],
  ["@", "B", "+", " ", "+", "+", " ", "H"],
  [" ", "+", "+", " ", " ", " ", " ", "x"],
];

try {
  // Create a Map object from the parsed grid
  const map = new Map(inputMap);

  // Find the path on the map
  const pathFinder = new PathFinder();

  const { path, letters }: PathFinderResponse = pathFinder.findPath(map);

  console.log("PATH:", path);

  // Output the collected letters and the recorded path
  console.log("Collected letters:", letters);
  console.log("Recorded path:", path);
} catch (error) {
  console.error("An error occurred:", error.message);
}
