#!/usr/bin/env ts-node

import * as readline from "readline";

type Position = {
  x: number;
  y: number;
};

enum Direction {
  NORTH = "North",
  EAST = "East",
  SOUTH = "South",
  WEST = "West",
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const validatorInputRegex = /^(?:[LR]*W[0-9]+)*[LR]*$/;
const commandRegex = /W\d+|[LR]/g;

const walk = (
  step: number,
  currentDirection: string,
  position: Position
): Position => {
  switch (currentDirection) {
    case Direction.NORTH:
      return (position = {
        x: position.x,
        y: position.y + step,
      });
    case Direction.WEST:
      return (position = {
        x: position.x - step,
        y: position.y,
      });
    case Direction.EAST:
      return (position = {
        x: position.x + step,
        y: position.y,
      });
    case Direction.SOUTH:
      return (position = {
        x: position.x,
        y: position.y - step,
      });
  }
};

const turnLeft = (currentDirection: Direction): Direction => {
  switch (currentDirection) {
    case Direction.NORTH:
      return Direction.WEST;
    case Direction.EAST:
      return Direction.NORTH;
    case Direction.SOUTH:
      return Direction.EAST;
    case Direction.WEST:
      return Direction.SOUTH;
    default:
      return currentDirection;
  }
};
const turnRight = (currentDirection: Direction): Direction => {
  switch (currentDirection) {
    case Direction.NORTH:
      return Direction.EAST;
    case Direction.EAST:
      return Direction.SOUTH;
    case Direction.SOUTH:
      return Direction.WEST;
    case Direction.WEST:
      return Direction.NORTH;
    default:
      return currentDirection;
  }
};

rl.question("Enter a string to validate: ", (input: string) => {
  if (!validatorInputRegex.test(input)) {
    console.log(
      "❌ Invalid input. Allowed format: 'W' followed by digits (optional), then any 'L' or 'R'."
    );
    rl.close();
    return;
  }

  const commandList = input.match(commandRegex) || [];

  if (commandList.length === 0) {
    console.log("❌ Blank command");
    rl.close();
    return;
  }

  let position: Position = {
    x: 0,
    y: 0,
  };
  let direction = Direction.NORTH;

  commandList.forEach((command: string) => {
    if (command === "L") {
      direction = turnLeft(direction);
    }
    if (command === "R") {
      direction = turnRight(direction);
    }
    if (command.substring(0, 1) === "W") {
      const step = parseInt(command.slice(1));
      position = walk(step, direction, position);
    }
  });

  console.log(`
    X: ${position.x}
    Y: ${position.y}
    Direction: ${direction}
    `);

  rl.close();
});
