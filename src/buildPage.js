const letters = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
};

export default function build() {
  const div = document.createElement('div');

  document
    .querySelector('body')
    .appendChild(div.cloneNode(true))
    .classList.add('humanContainer', 'container');
  document
    .querySelector('.humanContainer')
    .appendChild(document.createElement('h2'))
    .classList.add('title');
  document.querySelector('.title').textContent = 'YOU';
  document
    .querySelector('.humanContainer')
    .appendChild(div.cloneNode(true))
    .classList.add('humanBoard', 'board');

  // Now for the robot part
  document
    .querySelector('body')
    .appendChild(div.cloneNode(true))
    .classList.add('robotContainer', 'container');
  document
    .querySelector('.robotContainer')
    .appendChild(document.createElement('h2'))
    .classList.add('title');
  document.querySelector('.robotContainer > .title').textContent = 'ROBOT';
  document
    .querySelector('.robotContainer')
    .appendChild(div.cloneNode(true))
    .classList.add('robotBoard', 'board');

  // Now for the bottom part with the 3 different things
  document
    .querySelector('body')
    .appendChild(div.cloneNode(true))
    .classList.add('info');

  // Play button
  document
    .querySelector('.info')
    .appendChild(document.createElement('button'))
    .classList.add('play');
  document.querySelector('.play').textContent = 'PLAY';

  // Now the Form
  document
    .querySelector('.info')
    .appendChild(document.createElement('form'))
    .classList.add('hidden');
  document
    .querySelector('form')
    .appendChild(document.createElement('label'))
    .setAttribute('for', 'text');
  document.querySelector('label').textContent = 'NAME:';
  document
    .querySelector('form')
    .appendChild(document.createElement('input'))
    .setAttribute('type', 'text');
  // Helper function to help DRY
  function attributeAdder(query, attribute, toSet) {
    document.querySelector(`${query}`).setAttribute(`${attribute}`, `${toSet}`);
  }
  attributeAdder('input', 'name', 'name');
  attributeAdder('input', 'id', 'name');
  attributeAdder('input', 'maxlength', '15');
  attributeAdder('input', 'minlength', '1');
  document
    .querySelector('form')
    .appendChild(document.createElement('button'))
    .classList.add('submit', 'play');
  document.querySelector('form > button').textContent = 'START';
  document
    .querySelector('.info')
    .appendChild(document.createElement('p'))
    .classList.add('guesses', 'hidden');

  // Now initialize the guesses array for the game
  document.querySelector('.guesses').textContent = 'Your Turn!';

  // Finish by filling in the squares
  document.querySelectorAll('.board').forEach((element) => {
    for (let i = 1; i <= 7; i++) {
      for (let j = 1; j <= 7; j++) {
        element
          .appendChild(div.cloneNode(true))
          .classList.add('square', `${letters[i]}-${j}`);
      }
    }
  });
}
