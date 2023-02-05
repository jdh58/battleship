import { Ship, Gameboard } from "./index.js";

test("ship is not sunk", () => {
  const testShip = new Ship(3);

  expect(testShip.isSunk()).toBe(false);
});

test("ship is sunk", () => {
  const testShip = new Ship(3);

  // Relies on hit() working properly
  testShip.hit();
  testShip.hit();
  testShip.hit();

  expect(testShip.isSunk()).toBe(true);
});

test("ships hit() function works", () => {
  const testShip = Ship(4);
  testShip.hit();

  expect(testShip.hitsNum).toBe(1);
});

test("gameboard adds hit to ship when correct coordinate is called", () => {
  const testBoard = Gameboard();
  testBoard.recieveAttack(["b", 4]);

  expect(testBoard.ships[4].hitsNum).toBe(1);
});

test("gameboard adss hit to hit array", () => {
  const testBoard = Gameboard();
  testBoard.recieveAttack(["b", 4]);

  expect(testBoard.hits.length).toBe(1);
});

test("gameboard adds coordinates to miss array", () => {
  const testBoard = Gameboard();
  testBoard.recieveAttack(["b", 2]);

  expect(testBoard.misses.length).toBe(1);
});

test("gameboard rejects repeat coordinates", () => {
  const testBoard = Gameboard();
  testBoard.recieveAttack(["b", 2]);
  testBoard.recieveAttack(["b", 4]);

  // Have to wrap the expect in a function if we want to use toThrow

  expect(() => {
    testBoard.recieveAttack(["b", 4]);
  }).toThrow("Already called coordinate");
  expect(() => {
    testBoard.recieveAttack(["b", 4]);
  }).toThrow("Already called coordinate");
});
