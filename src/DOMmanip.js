export function addEventListeners() {
  document.querySelector('.info > .play').addEventListener('click', (e) => {
    e.target.classList.add('hidden');
    document.querySelector('form').classList.remove('hidden');
  });
}

const letters = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
};

export function board() {
  const disable = () => {
    /* Deactive the robot squares to be dead by cloning them.
    Kills visuals and working attacks by clearing all event listeners */
    document.querySelectorAll('.robotBoard > .square').forEach((square) => {
      square.classList.remove('active');
      // Tested this but doesnt seem to be what's breaking it
      const oldSquare = square;
      const newSquare = oldSquare.cloneNode(true);
      oldSquare.parentElement.replaceChild(newSquare, oldSquare);
    });
  };

  const enable = () => {
    document.querySelectorAll('.robotBoard > .square').forEach((square) => {
      square.classList.add('active');
    });
  };

  const start = (e, human) => {
    // Hide the form and show the guessed array
    e.composedPath()[1].classList.add('hidden');
    document.querySelector('.guesses').classList.remove('hidden');

    // Set the name of the player
    document.querySelector('.humanContainer > .title').textContent =
      document.querySelector('form').elements.name.value;

    // Activate the robot squares to be visually active
    enable();

    // Show your ships as grey on the board
    document.querySelectorAll('.humanBoard > .square').forEach((square) => {
      for (let i = 0; i < human.ships.length; i++) {
        for (let j = 0; j < human.ships[i].coords.length; j++) {
          if (
            square.classList.contains(
              human.ships[i].coords[j].toString().replace(',', '-')
            )
          ) {
            square.style.backgroundColor = 'rgba(200, 200, 200, .5)';
          }
        }
      }
    });
  };

  return {
    start,
    disable,
    enable,
  };
}

export function attack() {
  const repeat = () => {
    document.querySelector('.guesses').style.color = 'yellow';
    document.querySelector('.guesses').textContent =
      'Already attacked that square. try again!';
  };

  const miss = (squareCoords) => {
    const square = document.querySelector(
      `.robotBoard > .${squareCoords.toString().replace(',', '-')}`
    );
    square.textContent = '0';
    square.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    square.style.color = 'rgb(255, 255, 255)';
    document.querySelector('.guesses').style.color = 'white';
    document.querySelector('.guesses').textContent = 'YOU MISSED!';
    console.trace();
  };

  const hit = (squareCoords) => {
    const square = document.querySelector(
      `.robotBoard > .${squareCoords.toString().replace(',', '-')}`
    );
    square.textContent = 'X';
    square.style.backgroundColor = 'rgba(255, 0, 0, 0.75)';
    square.style.color = 'red';
    document.querySelector('.guesses').textContent = 'YOU GOT A HIT!';
    document.querySelector('.guesses').style.color = 'red';
  };

  const gameOver = () => {
    document.querySelector('.guesses').textContent = 'GAME OVER! YOU WIN';
    document.querySelector('.guesses').style.color = 'rgb(0, 255, 0)';
  };

  return {
    repeat,
    miss,
    hit,
    gameOver,
  };
}

export function defend() {
  const miss = (squareCoords) => {
    const square = document.querySelector(
      `.humanBoard > .${squareCoords.toString().replace(',', '-')}`
    );
    square.textContent = '0';
    square.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    square.style.color = 'rgb(255, 255, 255)';
    document.querySelector('.guesses').style.color = 'white';
    document.querySelector('.guesses').textContent = 'THEY MISSED!';
  };

  const hit = (squareCoords) => {
    const square = document.querySelector(
      `.humanBoard > .${squareCoords.toString().replace(',', '-')}`
    );
    square.textContent = 'X';
    square.style.backgroundColor = 'rgba(255, 0, 0, 0.75)';
    square.style.color = 'red';
    document.querySelector('.guesses').textContent = 'THEY GOT A HIT!';
    document.querySelector('.guesses').style.color = 'red';
  };

  const gameOver = () => {
    document.querySelector('.guesses').textContent = 'GAME OVER! YOU LOSE';
    document.querySelector('.guesses').style.color = 'rgb(200, 0, 0)';
  };

  return {
    miss,
    hit,
    gameOver,
  };
}
