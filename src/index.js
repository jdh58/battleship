const Ship = (length = 3) => ({
  length,
  hitsNum: 0,
  coords: [],

  hit() {
    this.hitsNum += 1;
  },

  isSunk() {
    if (this.hitsNum >= this.length) {
      return true;
    }
    return false;
  },

  addCoords(coord) {
    for (let i = 0; i < coord.length; i++) {
      this.coords.push(coord[i]);
    }
  },
});

const Gameboard = () => {
  const destroyer = Ship(2);
  destroyer.addCoords([
    ["c", 4],
    ["c", 5],
  ]);

  const submarine = Ship(3);
  submarine.addCoords([
    ["a", 1],
    ["a", 2],
    ["a", 3],
  ]);

  const cruiser = Ship(3);
  cruiser.addCoords([
    ["e", 7],
    ["f", 7],
    ["g", 7],
  ]);

  const battleship = Ship(4);
  battleship.addCoords([
    ["d", 1],
    ["e", 1],
    ["f", 1],
    ["g", 1],
  ]);

  const carrier = Ship(5);
  carrier.addCoords([
    ["b", 3],
    ["b", 4],
    ["b", 5],
    ["b", 6],
    ["b", 7],
  ]);

  return {
    ships: [destroyer, submarine, cruiser, battleship, carrier],
    hits: [],
    misses: [],

    recieveAttack(targetCoordinates) {
      // Check if the coordinates were already called
      const allCalled = [...this.hits, ...this.misses];
      for (let i = 0; i < allCalled.length; i++) {
        if (
          targetCoordinates[0] === allCalled[i][0] &&
          targetCoordinates[1] === allCalled[i][1]
        ) {
          throw new Error("Already called coordinate");
        }
      }

      for (let i = 0; i < this.ships.length; i++) {
        for (let j = 0; j < this.ships[i].coords.length; j++) {
          if (
            this.ships[i].coords[j][0] === targetCoordinates[0] &&
            this.ships[i].coords[j][1] === targetCoordinates[1]
          ) {
            this.ships[i].hit();
            this.hits.push(targetCoordinates);
            return;
          }
        }
      }
      this.misses.push(targetCoordinates);
    },
  };
};

const Player = (name) => {};

const Game = () => {};

const banana = Gameboard();

banana.recieveAttack(["b", 4]);

console.log(banana.ships[0]);

export { Ship, Gameboard };
