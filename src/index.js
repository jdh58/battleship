import buildPage from './buildPage';
import * as DOMmanip from './DOMmanip';
import './styles.css';

buildPage();
DOMmanip.addEventListeners();

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
    ['c', 4],
    ['c', 5],
  ]);

  const submarine = Ship(3);
  submarine.addCoords([
    ['a', 1],
    ['a', 2],
    ['a', 3],
  ]);

  const cruiser = Ship(3);
  cruiser.addCoords([
    ['e', 7],
    ['f', 7],
    ['g', 7],
  ]);

  const battleship = Ship(4);
  battleship.addCoords([
    ['d', 1],
    ['e', 1],
    ['f', 1],
    ['g', 1],
  ]);

  const carrier = Ship(5);
  carrier.addCoords([
    ['b', 3],
    ['b', 4],
    ['b', 5],
    ['b', 6],
    ['b', 7],
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
          return 'repeat';
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
            return 'hit';
          }
        }
      }
      this.misses.push(targetCoordinates);
      return 'miss';
    },
  };
};

const Game = () => {
  const letters = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
  };

  const allSunk = (player) => {
    for (let i = 0; i < player.ships.length; i++) {
      if (!player.ships[i].isSunk()) {
        return false;
      }
    }
    return true;
  };

  const computerTurn = (human, robot) => {
    let result = '';
    let attackCoords = [];
    do {
      attackCoords = [];
      attackCoords.push(letters[Math.floor(Math.random() * 7 + 1)]);
      attackCoords.push(Math.floor(Math.random() * 7 + 1));

      result = human.recieveAttack(attackCoords);
    } while (result === 'repeat');

    if (result === 'miss') {
      // Let the player know it was a miss and change nothing
      DOMmanip.defend().miss(attackCoords);
    }
    if (result === 'hit') {
      DOMmanip.defend().hit(attackCoords);
      // If the human is dead, end the game
      if (allSunk(human)) {
        DOMmanip.defend().gameOver();
        // Just return
        return;
      }
    }

    // Re-enable the board for the next turn
    document.querySelectorAll('.robotBoard > .square').forEach((square) => {
      square.addEventListener('click', () => {
        // Turn the class identifier into a valid attack
        const newAttackCoords = square.classList[1].split('-');
        newAttackCoords[1] = parseInt(newAttackCoords[1], 10);

        Game().playTurn(human, robot, newAttackCoords);
      });
    });
    DOMmanip.board().enable();
  };

  const playTurn = (human, robot, attackCoords) => {
    const result = robot.recieveAttack(attackCoords);

    if (result === 'repeat') {
      // Let the player know it's a repeat and change nothing
      DOMmanip.attack().repeat();
      return;
    }
    if (result === 'miss') {
      // Alerts the user
      DOMmanip.attack().miss(attackCoords);
    }
    if (result === 'hit') {
      DOMmanip.attack().hit(attackCoords);
      // If the robot is dead, end the gamne
      if (allSunk(robot)) {
        DOMmanip.attack().gameOver();
        // Disable the board and return
        DOMmanip.board().disable();
        return;
      }
    }

    // Disable the board and wait
    DOMmanip.board().disable();

    setTimeout(() => {
      // Play the computer's turn
      computerTurn(human, robot);
    }, 1000);
  };

  return { playTurn, computerTurn, allSunk };
};

export { Ship, Gameboard };

(function addEventListeners() {
  let human = null;
  let robot = null;

  document.querySelector('form > button').addEventListener('click', (e) => {
    e.preventDefault();
    human = Gameboard();
    robot = Gameboard();
    DOMmanip.board().start(e, human);

    // Logically let the robot squares start an attack
    document.querySelectorAll('.robotBoard > .square').forEach((square) => {
      square.addEventListener('click', () => {
        // Turn the class identifier into a valid attack
        const attackCoords = square.classList[1].split('-');
        attackCoords[1] = parseInt(attackCoords[1], 10);

        Game().playTurn(human, robot, attackCoords);
      });
    });
  });
})();
