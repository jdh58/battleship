/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMmanip.js":
/*!*************************!*\
  !*** ./src/DOMmanip.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEventListeners": () => (/* binding */ addEventListeners),
/* harmony export */   "attack": () => (/* binding */ attack),
/* harmony export */   "board": () => (/* binding */ board),
/* harmony export */   "defend": () => (/* binding */ defend)
/* harmony export */ });
function addEventListeners() {
  document.querySelector('.info > .play').addEventListener('click', e => {
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
  7: 'g'
};
function board() {
  const disable = () => {
    /* Deactive the robot squares to be dead by cloning them.
    Kills visuals and working attacks by clearing all event listeners */
    document.querySelectorAll('.robotBoard > .square').forEach(square => {
      square.classList.remove('active');
      // Tested this but doesnt seem to be what's breaking it
      const oldSquare = square;
      const newSquare = oldSquare.cloneNode(true);
      oldSquare.parentElement.replaceChild(newSquare, oldSquare);
    });
  };
  const enable = () => {
    document.querySelectorAll('.robotBoard > .square').forEach(square => {
      square.classList.add('active');
    });
  };
  const start = (e, human) => {
    // Hide the form and show the guessed array
    e.composedPath()[1].classList.add('hidden');
    document.querySelector('.guesses').classList.remove('hidden');

    // Set the name of the player
    document.querySelector('.humanContainer > .title').textContent = document.querySelector('form').elements.name.value;

    // Activate the robot squares to be visually active
    enable();

    // Show your ships as grey on the board
    document.querySelectorAll('.humanBoard > .square').forEach(square => {
      for (let i = 0; i < human.ships.length; i++) {
        for (let j = 0; j < human.ships[i].coords.length; j++) {
          if (square.classList.contains(human.ships[i].coords[j].toString().replace(',', '-'))) {
            square.style.backgroundColor = 'rgba(200, 200, 200, .5)';
          }
        }
      }
    });
  };
  return {
    start,
    disable,
    enable
  };
}
function attack() {
  const repeat = () => {
    document.querySelector('.guesses').style.color = 'yellow';
    document.querySelector('.guesses').textContent = 'Already attacked that square. try again!';
  };
  const miss = squareCoords => {
    const square = document.querySelector(`.robotBoard > .${squareCoords.toString().replace(',', '-')}`);
    square.textContent = '0';
    square.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    square.style.color = 'rgb(255, 255, 255)';
    document.querySelector('.guesses').style.color = 'white';
    document.querySelector('.guesses').textContent = 'YOU MISSED!';
    console.trace();
  };
  const hit = squareCoords => {
    const square = document.querySelector(`.robotBoard > .${squareCoords.toString().replace(',', '-')}`);
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
    gameOver
  };
}
function defend() {
  const miss = squareCoords => {
    const square = document.querySelector(`.humanBoard > .${squareCoords.toString().replace(',', '-')}`);
    square.textContent = '0';
    square.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    square.style.color = 'rgb(255, 255, 255)';
    document.querySelector('.guesses').style.color = 'white';
    document.querySelector('.guesses').textContent = 'THEY MISSED!';
  };
  const hit = squareCoords => {
    const square = document.querySelector(`.humanBoard > .${squareCoords.toString().replace(',', '-')}`);
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
    gameOver
  };
}

/***/ }),

/***/ "./src/buildPage.js":
/*!**************************!*\
  !*** ./src/buildPage.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ build)
/* harmony export */ });
const letters = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g'
};
function build() {
  const div = document.createElement('div');
  document.querySelector('body').appendChild(div.cloneNode(true)).classList.add('humanContainer', 'container');
  document.querySelector('.humanContainer').appendChild(document.createElement('h2')).classList.add('title');
  document.querySelector('.title').textContent = 'YOU';
  document.querySelector('.humanContainer').appendChild(div.cloneNode(true)).classList.add('humanBoard', 'board');

  // Now for the robot part
  document.querySelector('body').appendChild(div.cloneNode(true)).classList.add('robotContainer', 'container');
  document.querySelector('.robotContainer').appendChild(document.createElement('h2')).classList.add('title');
  document.querySelector('.robotContainer > .title').textContent = 'ROBOT';
  document.querySelector('.robotContainer').appendChild(div.cloneNode(true)).classList.add('robotBoard', 'board');

  // Now for the bottom part with the 3 different things
  document.querySelector('body').appendChild(div.cloneNode(true)).classList.add('info');

  // Play button
  document.querySelector('.info').appendChild(document.createElement('button')).classList.add('play');
  document.querySelector('.play').textContent = 'PLAY';

  // Now the Form
  document.querySelector('.info').appendChild(document.createElement('form')).classList.add('hidden');
  document.querySelector('form').appendChild(document.createElement('label')).setAttribute('for', 'text');
  document.querySelector('label').textContent = 'NAME:';
  document.querySelector('form').appendChild(document.createElement('input')).setAttribute('type', 'text');
  // Helper function to help DRY
  function attributeAdder(query, attribute, toSet) {
    document.querySelector(`${query}`).setAttribute(`${attribute}`, `${toSet}`);
  }
  attributeAdder('input', 'name', 'name');
  attributeAdder('input', 'id', 'name');
  attributeAdder('input', 'maxlength', '15');
  attributeAdder('input', 'minlength', '1');
  document.querySelector('form').appendChild(document.createElement('button')).classList.add('submit', 'play');
  document.querySelector('form > button').textContent = 'START';
  document.querySelector('.info').appendChild(document.createElement('p')).classList.add('guesses', 'hidden');

  // Now initialize the guesses array for the game
  document.querySelector('.guesses').textContent = 'Your Turn!';

  // Finish by filling in the squares
  document.querySelectorAll('.board').forEach(element => {
    for (let i = 1; i <= 7; i++) {
      for (let j = 1; j <= 7; j++) {
        element.appendChild(div.cloneNode(true)).classList.add('square', `${letters[i]}-${j}`);
      }
    }
  });
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Pixeboy-z8XGD.ttf */ "./src/fonts/Pixeboy-z8XGD.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Box sizing rules */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/*////////////// END OF CSS RESET ////////////////*/\n\n@font-face {\n  font-family: '8-Bit';\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  font-style: normal;\n  font-weight: 300;\n}\n\n:root {\n  font-size: 10px;\n  font-family: '8-Bit', sans-serif;\n}\n\nbody {\n  height: 100vh;\n  display: grid;\n  grid-template-rows: 4fr 1fr;\n  grid-template-columns: 1fr 1fr;\n  background-color: #89cff0;\n}\n\n.container {\n  grid-row: 1 / 2;\n  display: grid;\n  grid-template-rows: 1fr 6.5fr;\n  justify-content: center;\n  align-items: center;\n}\n\n.humanContainer {\n  grid-column: 1 / 2;\n  /* background-color: rgb(20, 200, 28); */\n}\n\n.robotContainer {\n  grid-row: 1 / 2;\n  grid-column: -2 / -1;\n  /* background-color: rgb(90, 90, 255); */\n}\n\n.title {\n  display: grids;\n  text-align: center;\n  font-size: 7rem;\n  color: white;\n  align-self: end;\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000, 0px 2px 4px black;\n}\n\n.board {\n  align-self: start;\n  background-color: rgb(19, 125, 255);\n  border: 1px solid black;\n  width: 500px;\n  height: 500px;\n  display: grid;\n  grid-template-rows: repeat(7, 1fr);\n  grid-template-columns: repeat(7, 1fr);\n  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.556);\n}\n\n/* .a-1 {\n  background-color: rgba(255, 0, 0, 0.75);\n}\n.a-2 {\n  background-color: rgba(255, 255, 255, 0.5);\n} */\n\n.square {\n  border: 1px solid black;\n  padding: 2px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  font-size: 6rem;\n  color: white;\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000, 0px 2px 4px black;\n}\n\n.square.active:hover {\n  cursor: pointer;\n  background-color: rgba(255, 0, 0, 0.5);\n}\n\n.info {\n  grid-row: -2 / -1;\n  grid-column: 1 / -1;\n  /* background-color: rgb(205, 28, 28); */\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.play {\n  background-color: rgba(255, 255, 255, 0);\n  width: 200px;\n  height: 75px;\n  font-family: '8-Bit', sans-serif;\n  font-size: 5rem;\n  border: 4px solid rgb(0, 255, 0);\n  box-shadow: 0 0 4px black;\n  color: rgb(0, 255, 0);\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000;\n  border-radius: 10px;\n}\n\n.play:hover {\n  border: 4px solid rgb(255, 255, 255);\n  background-color: rgb(0, 255, 0);\n  cursor: pointer;\n  color: rgb(255, 255, 255);\n}\n\n.play:active {\n  width: 198px;\n  height: 74.25px;\n  font-size: 4.95rem;\n  box-shadow: 0 0 6px rgba(0, 0, 0, 0.901);\n  margin: 0px 1px;\n}\n\n.guesses {\n  color: white;\n  font-size: 6rem;\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000, 0px 2px 4px black;\n}\n\nform {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n\nlabel {\n  color: white;\n  font-size: 6rem;\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000, 0px 2px 4px black;\n  vertical-align: bottom;\n}\n\nform > input {\n  background-color: transparent;\n  border: none;\n  border-bottom: 2px solid black;\n  height: 4rem;\n  width: 250px;\n  font-size: 5rem;\n  font-family: '8-Bit', sans-serif;\n  outline: none;\n  color: rgb(245, 245, 245);\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000;\n}\n\nform > .play {\n}\n.hidden {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA,qBAAqB;AACrB;;;EAGE,sBAAsB;AACxB;;AAEA;;;CAGC;;AAED;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAiFE,SAAS;EACT,UAAU;EACV,SAAS;EACT,eAAe;EACf,aAAa;EACb,wBAAwB;AAC1B;AACA,gDAAgD;AAChD;;;;;;;;;;;EAWE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,YAAY;AACd;AACA;;;;EAIE,WAAW;EACX,aAAa;AACf;AACA;EACE,yBAAyB;EACzB,iBAAiB;AACnB;;AAEA,mDAAmD;;AAEnD;EACE,oBAAoB;EACpB,4CAAmC;EACnC,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,gCAAgC;AAClC;;AAEA;EACE,aAAa;EACb,aAAa;EACb,2BAA2B;EAC3B,8BAA8B;EAC9B,yBAAyB;AAC3B;;AAEA;EACE,eAAe;EACf,aAAa;EACb,6BAA6B;EAC7B,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,wCAAwC;AAC1C;;AAEA;EACE,eAAe;EACf,oBAAoB;EACpB,wCAAwC;AAC1C;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,eAAe;EACf,YAAY;EACZ,eAAe;EACf;qCACmC;AACrC;;AAEA;EACE,iBAAiB;EACjB,mCAAmC;EACnC,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,kCAAkC;EAClC,qCAAqC;EACrC,4CAA4C;AAC9C;;AAEA;;;;;GAKG;;AAEH;EACE,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,eAAe;EACf,YAAY;EACZ;qCACmC;AACrC;;AAEA;EACE,eAAe;EACf,sCAAsC;AACxC;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,wCAAwC;EACxC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,wCAAwC;EACxC,YAAY;EACZ,YAAY;EACZ,gCAAgC;EAChC,eAAe;EACf,gCAAgC;EAChC,yBAAyB;EACzB,qBAAqB;EACrB;kBACgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,oCAAoC;EACpC,gCAAgC;EAChC,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,YAAY;EACZ,eAAe;EACf,kBAAkB;EAClB,wCAAwC;EACxC,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,eAAe;EACf;qCACmC;AACrC;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,YAAY;EACZ,eAAe;EACf;qCACmC;EACnC,sBAAsB;AACxB;;AAEA;EACE,6BAA6B;EAC7B,YAAY;EACZ,8BAA8B;EAC9B,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,gCAAgC;EAChC,aAAa;EACb,yBAAyB;EACzB;kBACgB;AAClB;;AAEA;AACA;AACA;EACE,aAAa;AACf","sourcesContent":["/* Box sizing rules */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/*////////////// END OF CSS RESET ////////////////*/\n\n@font-face {\n  font-family: '8-Bit';\n  src: url(./fonts/Pixeboy-z8XGD.ttf);\n  font-style: normal;\n  font-weight: 300;\n}\n\n:root {\n  font-size: 10px;\n  font-family: '8-Bit', sans-serif;\n}\n\nbody {\n  height: 100vh;\n  display: grid;\n  grid-template-rows: 4fr 1fr;\n  grid-template-columns: 1fr 1fr;\n  background-color: #89cff0;\n}\n\n.container {\n  grid-row: 1 / 2;\n  display: grid;\n  grid-template-rows: 1fr 6.5fr;\n  justify-content: center;\n  align-items: center;\n}\n\n.humanContainer {\n  grid-column: 1 / 2;\n  /* background-color: rgb(20, 200, 28); */\n}\n\n.robotContainer {\n  grid-row: 1 / 2;\n  grid-column: -2 / -1;\n  /* background-color: rgb(90, 90, 255); */\n}\n\n.title {\n  display: grids;\n  text-align: center;\n  font-size: 7rem;\n  color: white;\n  align-self: end;\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000, 0px 2px 4px black;\n}\n\n.board {\n  align-self: start;\n  background-color: rgb(19, 125, 255);\n  border: 1px solid black;\n  width: 500px;\n  height: 500px;\n  display: grid;\n  grid-template-rows: repeat(7, 1fr);\n  grid-template-columns: repeat(7, 1fr);\n  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.556);\n}\n\n/* .a-1 {\n  background-color: rgba(255, 0, 0, 0.75);\n}\n.a-2 {\n  background-color: rgba(255, 255, 255, 0.5);\n} */\n\n.square {\n  border: 1px solid black;\n  padding: 2px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  font-size: 6rem;\n  color: white;\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000, 0px 2px 4px black;\n}\n\n.square.active:hover {\n  cursor: pointer;\n  background-color: rgba(255, 0, 0, 0.5);\n}\n\n.info {\n  grid-row: -2 / -1;\n  grid-column: 1 / -1;\n  /* background-color: rgb(205, 28, 28); */\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.play {\n  background-color: rgba(255, 255, 255, 0);\n  width: 200px;\n  height: 75px;\n  font-family: '8-Bit', sans-serif;\n  font-size: 5rem;\n  border: 4px solid rgb(0, 255, 0);\n  box-shadow: 0 0 4px black;\n  color: rgb(0, 255, 0);\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000;\n  border-radius: 10px;\n}\n\n.play:hover {\n  border: 4px solid rgb(255, 255, 255);\n  background-color: rgb(0, 255, 0);\n  cursor: pointer;\n  color: rgb(255, 255, 255);\n}\n\n.play:active {\n  width: 198px;\n  height: 74.25px;\n  font-size: 4.95rem;\n  box-shadow: 0 0 6px rgba(0, 0, 0, 0.901);\n  margin: 0px 1px;\n}\n\n.guesses {\n  color: white;\n  font-size: 6rem;\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000, 0px 2px 4px black;\n}\n\nform {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n\nlabel {\n  color: white;\n  font-size: 6rem;\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000, 0px 2px 4px black;\n  vertical-align: bottom;\n}\n\nform > input {\n  background-color: transparent;\n  border: none;\n  border-bottom: 2px solid black;\n  height: 4rem;\n  width: 250px;\n  font-size: 5rem;\n  font-family: '8-Bit', sans-serif;\n  outline: none;\n  color: rgb(245, 245, 245);\n  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,\n    2px 2px 0 #000;\n}\n\nform > .play {\n}\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/fonts/Pixeboy-z8XGD.ttf":
/*!*************************************!*\
  !*** ./src/fonts/Pixeboy-z8XGD.ttf ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "143c9dc71d2a56d4bc46.ttf";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard),
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
/* harmony import */ var _buildPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildPage */ "./src/buildPage.js");
/* harmony import */ var _DOMmanip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMmanip */ "./src/DOMmanip.js");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");



(0,_buildPage__WEBPACK_IMPORTED_MODULE_0__["default"])();
_DOMmanip__WEBPACK_IMPORTED_MODULE_1__.addEventListeners();
const Ship = function () {
  let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
  return {
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
    }
  };
};
const Gameboard = () => {
  const destroyer = Ship(2);
  destroyer.addCoords([['c', 4], ['c', 5]]);
  const submarine = Ship(3);
  submarine.addCoords([['a', 1], ['a', 2], ['a', 3]]);
  const cruiser = Ship(3);
  cruiser.addCoords([['e', 7], ['f', 7], ['g', 7]]);
  const battleship = Ship(4);
  battleship.addCoords([['d', 1], ['e', 1], ['f', 1], ['g', 1]]);
  const carrier = Ship(5);
  carrier.addCoords([['b', 3], ['b', 4], ['b', 5], ['b', 6], ['b', 7]]);
  return {
    ships: [destroyer, submarine, cruiser, battleship, carrier],
    hits: [],
    misses: [],
    recieveAttack(targetCoordinates) {
      // Check if the coordinates were already called
      const allCalled = [...this.hits, ...this.misses];
      for (let i = 0; i < allCalled.length; i++) {
        if (targetCoordinates[0] === allCalled[i][0] && targetCoordinates[1] === allCalled[i][1]) {
          return 'repeat';
        }
      }
      for (let i = 0; i < this.ships.length; i++) {
        for (let j = 0; j < this.ships[i].coords.length; j++) {
          if (this.ships[i].coords[j][0] === targetCoordinates[0] && this.ships[i].coords[j][1] === targetCoordinates[1]) {
            this.ships[i].hit();
            this.hits.push(targetCoordinates);
            return 'hit';
          }
        }
      }
      this.misses.push(targetCoordinates);
      return 'miss';
    }
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
    7: 'g'
  };
  const allSunk = player => {
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
      _DOMmanip__WEBPACK_IMPORTED_MODULE_1__.defend().miss(attackCoords);
    }
    if (result === 'hit') {
      _DOMmanip__WEBPACK_IMPORTED_MODULE_1__.defend().hit(attackCoords);
      // If the human is dead, end the game
      if (allSunk(human)) {
        _DOMmanip__WEBPACK_IMPORTED_MODULE_1__.defend().gameOver();
        // Just return
        return;
      }
    }

    // Re-enable the board for the next turn
    document.querySelectorAll('.robotBoard > .square').forEach(square => {
      square.addEventListener('click', () => {
        // Turn the class identifier into a valid attack
        const newAttackCoords = square.classList[1].split('-');
        newAttackCoords[1] = parseInt(newAttackCoords[1], 10);
        Game().playTurn(human, robot, newAttackCoords);
      });
    });
    _DOMmanip__WEBPACK_IMPORTED_MODULE_1__.board().enable();
  };
  const playTurn = (human, robot, attackCoords) => {
    const result = robot.recieveAttack(attackCoords);
    if (result === 'repeat') {
      // Let the player know it's a repeat and change nothing
      _DOMmanip__WEBPACK_IMPORTED_MODULE_1__.attack().repeat();
      return;
    }
    if (result === 'miss') {
      // Alerts the user
      _DOMmanip__WEBPACK_IMPORTED_MODULE_1__.attack().miss(attackCoords);
    }
    if (result === 'hit') {
      _DOMmanip__WEBPACK_IMPORTED_MODULE_1__.attack().hit(attackCoords);
      // If the robot is dead, end the gamne
      if (allSunk(robot)) {
        _DOMmanip__WEBPACK_IMPORTED_MODULE_1__.attack().gameOver();
        // Disable the board and return
        _DOMmanip__WEBPACK_IMPORTED_MODULE_1__.board().disable();
        return;
      }
    }

    // Disable the board and wait
    _DOMmanip__WEBPACK_IMPORTED_MODULE_1__.board().disable();
    setTimeout(() => {
      // Play the computer's turn
      computerTurn(human, robot);
    }, 1000);
  };
  return {
    playTurn,
    computerTurn,
    allSunk
  };
};

(function addEventListeners() {
  let human = null;
  let robot = null;
  document.querySelector('form > button').addEventListener('click', e => {
    e.preventDefault();
    human = Gameboard();
    robot = Gameboard();
    _DOMmanip__WEBPACK_IMPORTED_MODULE_1__.board().start(e, human);

    // Logically let the robot squares start an attack
    document.querySelectorAll('.robotBoard > .square').forEach(square => {
      square.addEventListener('click', () => {
        // Turn the class identifier into a valid attack
        const attackCoords = square.classList[1].split('-');
        attackCoords[1] = parseInt(attackCoords[1], 10);
        Game().playTurn(human, robot, attackCoords);
      });
    });
  });
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxLQUFLLEdBQUcsSUFBSTtFQUVoQmhGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdDLENBQUMsSUFBSztJQUN2RUEsQ0FBQyxDQUFDd0YsY0FBYyxFQUFFO0lBQ2xCdEUsS0FBSyxHQUFHNEMsU0FBUyxFQUFFO0lBQ25CZSxLQUFLLEdBQUdmLFNBQVMsRUFBRTtJQUNuQlAsNENBQWMsRUFBRSxDQUFDdEMsS0FBSyxDQUFDakIsQ0FBQyxFQUFFa0IsS0FBSyxDQUFDOztJQUVoQztJQUNBckIsUUFBUSxDQUFDVyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDQyxPQUFPLENBQUVDLE1BQU0sSUFBSztNQUNyRUEsTUFBTSxDQUFDWCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtRQUNyQztRQUNBLE1BQU1nRixZQUFZLEdBQUdyRSxNQUFNLENBQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2tGLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDbkRMLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBR00sUUFBUSxDQUFDTixZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBRS9DTixJQUFJLEVBQUUsQ0FBQ2EsUUFBUSxDQUFDcEUsS0FBSyxFQUFFMkQsS0FBSyxFQUFFRSxZQUFZLENBQUM7TUFDN0MsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxHQUFHLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTW1hbmlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYnVpbGRQYWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMuY3NzPzQ0YjIiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mbyA+IC5wbGF5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgfSk7XG59XG5cbmNvbnN0IGxldHRlcnMgPSB7XG4gIDE6ICdhJyxcbiAgMjogJ2InLFxuICAzOiAnYycsXG4gIDQ6ICdkJyxcbiAgNTogJ2UnLFxuICA2OiAnZicsXG4gIDc6ICdnJyxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBib2FyZCgpIHtcbiAgY29uc3QgZGlzYWJsZSA9ICgpID0+IHtcbiAgICAvKiBEZWFjdGl2ZSB0aGUgcm9ib3Qgc3F1YXJlcyB0byBiZSBkZWFkIGJ5IGNsb25pbmcgdGhlbS5cbiAgICBLaWxscyB2aXN1YWxzIGFuZCB3b3JraW5nIGF0dGFja3MgYnkgY2xlYXJpbmcgYWxsIGV2ZW50IGxpc3RlbmVycyAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb2JvdEJvYXJkID4gLnNxdWFyZScpLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgLy8gVGVzdGVkIHRoaXMgYnV0IGRvZXNudCBzZWVtIHRvIGJlIHdoYXQncyBicmVha2luZyBpdFxuICAgICAgY29uc3Qgb2xkU3F1YXJlID0gc3F1YXJlO1xuICAgICAgY29uc3QgbmV3U3F1YXJlID0gb2xkU3F1YXJlLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIG9sZFNxdWFyZS5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChuZXdTcXVhcmUsIG9sZFNxdWFyZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZW5hYmxlID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb2JvdEJvYXJkID4gLnNxdWFyZScpLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHN0YXJ0ID0gKGUsIGh1bWFuKSA9PiB7XG4gICAgLy8gSGlkZSB0aGUgZm9ybSBhbmQgc2hvdyB0aGUgZ3Vlc3NlZCBhcnJheVxuICAgIGUuY29tcG9zZWRQYXRoKClbMV0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmd1ZXNzZXMnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblxuICAgIC8vIFNldCB0aGUgbmFtZSBvZiB0aGUgcGxheWVyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWFuQ29udGFpbmVyID4gLnRpdGxlJykudGV4dENvbnRlbnQgPVxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpLmVsZW1lbnRzLm5hbWUudmFsdWU7XG5cbiAgICAvLyBBY3RpdmF0ZSB0aGUgcm9ib3Qgc3F1YXJlcyB0byBiZSB2aXN1YWxseSBhY3RpdmVcbiAgICBlbmFibGUoKTtcblxuICAgIC8vIFNob3cgeW91ciBzaGlwcyBhcyBncmV5IG9uIHRoZSBib2FyZFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5odW1hbkJvYXJkID4gLnNxdWFyZScpLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBodW1hbi5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGh1bWFuLnNoaXBzW2ldLmNvb3Jkcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgICAgICAgICAgIGh1bWFuLnNoaXBzW2ldLmNvb3Jkc1tqXS50b1N0cmluZygpLnJlcGxhY2UoJywnLCAnLScpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjAwLCAyMDAsIDIwMCwgLjUpJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0LFxuICAgIGRpc2FibGUsXG4gICAgZW5hYmxlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNrKCkge1xuICBjb25zdCByZXBlYXQgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmd1ZXNzZXMnKS5zdHlsZS5jb2xvciA9ICd5ZWxsb3cnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ndWVzc2VzJykudGV4dENvbnRlbnQgPVxuICAgICAgJ0FscmVhZHkgYXR0YWNrZWQgdGhhdCBzcXVhcmUuIHRyeSBhZ2FpbiEnO1xuICB9O1xuXG4gIGNvbnN0IG1pc3MgPSAoc3F1YXJlQ29vcmRzKSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAucm9ib3RCb2FyZCA+IC4ke3NxdWFyZUNvb3Jkcy50b1N0cmluZygpLnJlcGxhY2UoJywnLCAnLScpfWBcbiAgICApO1xuICAgIHNxdWFyZS50ZXh0Q29udGVudCA9ICcwJztcbiAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC41KSc7XG4gICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gJ3JnYigyNTUsIDI1NSwgMjU1KSc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmd1ZXNzZXMnKS5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmd1ZXNzZXMnKS50ZXh0Q29udGVudCA9ICdZT1UgTUlTU0VEISc7XG4gICAgY29uc29sZS50cmFjZSgpO1xuICB9O1xuXG4gIGNvbnN0IGhpdCA9IChzcXVhcmVDb29yZHMpID0+IHtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC5yb2JvdEJvYXJkID4gLiR7c3F1YXJlQ29vcmRzLnRvU3RyaW5nKCkucmVwbGFjZSgnLCcsICctJyl9YFxuICAgICk7XG4gICAgc3F1YXJlLnRleHRDb250ZW50ID0gJ1gnO1xuICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyNTUsIDAsIDAsIDAuNzUpJztcbiAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3Vlc3NlcycpLnRleHRDb250ZW50ID0gJ1lPVSBHT1QgQSBISVQhJztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3Vlc3NlcycpLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gIH07XG5cbiAgY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmd1ZXNzZXMnKS50ZXh0Q29udGVudCA9ICdHQU1FIE9WRVIhIFlPVSBXSU4nO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ndWVzc2VzJykuc3R5bGUuY29sb3IgPSAncmdiKDAsIDI1NSwgMCknO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVwZWF0LFxuICAgIG1pc3MsXG4gICAgaGl0LFxuICAgIGdhbWVPdmVyLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmZW5kKCkge1xuICBjb25zdCBtaXNzID0gKHNxdWFyZUNvb3JkcykgPT4ge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLmh1bWFuQm9hcmQgPiAuJHtzcXVhcmVDb29yZHMudG9TdHJpbmcoKS5yZXBsYWNlKCcsJywgJy0nKX1gXG4gICAgKTtcbiAgICBzcXVhcmUudGV4dENvbnRlbnQgPSAnMCc7XG4gICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSknO1xuICAgIHNxdWFyZS5zdHlsZS5jb2xvciA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ndWVzc2VzJykuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ndWVzc2VzJykudGV4dENvbnRlbnQgPSAnVEhFWSBNSVNTRUQhJztcbiAgfTtcblxuICBjb25zdCBoaXQgPSAoc3F1YXJlQ29vcmRzKSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuaHVtYW5Cb2FyZCA+IC4ke3NxdWFyZUNvb3Jkcy50b1N0cmluZygpLnJlcGxhY2UoJywnLCAnLScpfWBcbiAgICApO1xuICAgIHNxdWFyZS50ZXh0Q29udGVudCA9ICdYJztcbiAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LCAwLCAwLCAwLjc1KSc7XG4gICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmd1ZXNzZXMnKS50ZXh0Q29udGVudCA9ICdUSEVZIEdPVCBBIEhJVCEnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ndWVzc2VzJykuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgfTtcblxuICBjb25zdCBnYW1lT3ZlciA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3Vlc3NlcycpLnRleHRDb250ZW50ID0gJ0dBTUUgT1ZFUiEgWU9VIExPU0UnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ndWVzc2VzJykuc3R5bGUuY29sb3IgPSAncmdiKDIwMCwgMCwgMCknO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbWlzcyxcbiAgICBoaXQsXG4gICAgZ2FtZU92ZXIsXG4gIH07XG59XG4iLCJjb25zdCBsZXR0ZXJzID0ge1xuICAxOiAnYScsXG4gIDI6ICdiJyxcbiAgMzogJ2MnLFxuICA0OiAnZCcsXG4gIDU6ICdlJyxcbiAgNjogJ2YnLFxuICA3OiAnZycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZCgpIHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgLmFwcGVuZENoaWxkKGRpdi5jbG9uZU5vZGUodHJ1ZSkpXG4gICAgLmNsYXNzTGlzdC5hZGQoJ2h1bWFuQ29udGFpbmVyJywgJ2NvbnRhaW5lcicpO1xuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKCcuaHVtYW5Db250YWluZXInKVxuICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpKVxuICAgIC5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKS50ZXh0Q29udGVudCA9ICdZT1UnO1xuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKCcuaHVtYW5Db250YWluZXInKVxuICAgIC5hcHBlbmRDaGlsZChkaXYuY2xvbmVOb2RlKHRydWUpKVxuICAgIC5jbGFzc0xpc3QuYWRkKCdodW1hbkJvYXJkJywgJ2JvYXJkJyk7XG5cbiAgLy8gTm93IGZvciB0aGUgcm9ib3QgcGFydFxuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICAuYXBwZW5kQ2hpbGQoZGl2LmNsb25lTm9kZSh0cnVlKSlcbiAgICAuY2xhc3NMaXN0LmFkZCgncm9ib3RDb250YWluZXInLCAnY29udGFpbmVyJyk7XG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoJy5yb2JvdENvbnRhaW5lcicpXG4gICAgLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJykpXG4gICAgLmNsYXNzTGlzdC5hZGQoJ3RpdGxlJyk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb2JvdENvbnRhaW5lciA+IC50aXRsZScpLnRleHRDb250ZW50ID0gJ1JPQk9UJztcbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcignLnJvYm90Q29udGFpbmVyJylcbiAgICAuYXBwZW5kQ2hpbGQoZGl2LmNsb25lTm9kZSh0cnVlKSlcbiAgICAuY2xhc3NMaXN0LmFkZCgncm9ib3RCb2FyZCcsICdib2FyZCcpO1xuXG4gIC8vIE5vdyBmb3IgdGhlIGJvdHRvbSBwYXJ0IHdpdGggdGhlIDMgZGlmZmVyZW50IHRoaW5nc1xuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICAuYXBwZW5kQ2hpbGQoZGl2LmNsb25lTm9kZSh0cnVlKSlcbiAgICAuY2xhc3NMaXN0LmFkZCgnaW5mbycpO1xuXG4gIC8vIFBsYXkgYnV0dG9uXG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvJylcbiAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJykpXG4gICAgLmNsYXNzTGlzdC5hZGQoJ3BsYXknKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXknKS50ZXh0Q29udGVudCA9ICdQTEFZJztcblxuICAvLyBOb3cgdGhlIEZvcm1cbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcignLmluZm8nKVxuICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJykpXG4gICAgLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKCdmb3JtJylcbiAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKSlcbiAgICAuc2V0QXR0cmlidXRlKCdmb3InLCAndGV4dCcpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbCcpLnRleHRDb250ZW50ID0gJ05BTUU6JztcbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcignZm9ybScpXG4gICAgLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpXG4gICAgLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBoZWxwIERSWVxuICBmdW5jdGlvbiBhdHRyaWJ1dGVBZGRlcihxdWVyeSwgYXR0cmlidXRlLCB0b1NldCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7cXVlcnl9YCkuc2V0QXR0cmlidXRlKGAke2F0dHJpYnV0ZX1gLCBgJHt0b1NldH1gKTtcbiAgfVxuICBhdHRyaWJ1dGVBZGRlcignaW5wdXQnLCAnbmFtZScsICduYW1lJyk7XG4gIGF0dHJpYnV0ZUFkZGVyKCdpbnB1dCcsICdpZCcsICduYW1lJyk7XG4gIGF0dHJpYnV0ZUFkZGVyKCdpbnB1dCcsICdtYXhsZW5ndGgnLCAnMTUnKTtcbiAgYXR0cmlidXRlQWRkZXIoJ2lucHV0JywgJ21pbmxlbmd0aCcsICcxJyk7XG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKVxuICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKSlcbiAgICAuY2xhc3NMaXN0LmFkZCgnc3VibWl0JywgJ3BsYXknKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybSA+IGJ1dHRvbicpLnRleHRDb250ZW50ID0gJ1NUQVJUJztcbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcignLmluZm8nKVxuICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykpXG4gICAgLmNsYXNzTGlzdC5hZGQoJ2d1ZXNzZXMnLCAnaGlkZGVuJyk7XG5cbiAgLy8gTm93IGluaXRpYWxpemUgdGhlIGd1ZXNzZXMgYXJyYXkgZm9yIHRoZSBnYW1lXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ndWVzc2VzJykudGV4dENvbnRlbnQgPSAnWW91ciBUdXJuISc7XG5cbiAgLy8gRmluaXNoIGJ5IGZpbGxpbmcgaW4gdGhlIHNxdWFyZXNcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkJykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDc7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gNzsgaisrKSB7XG4gICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAuYXBwZW5kQ2hpbGQoZGl2LmNsb25lTm9kZSh0cnVlKSlcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZCgnc3F1YXJlJywgYCR7bGV0dGVyc1tpXX0tJHtqfWApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9mb250cy9QaXhlYm95LXo4WEdELnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIEJveCBzaXppbmcgcnVsZXMgKi9cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4vKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCxcXG5ib2R5LFxcbmRpdixcXG5zcGFuLFxcbmFwcGxldCxcXG5vYmplY3QsXFxuaWZyYW1lLFxcbmgxLFxcbmgyLFxcbmgzLFxcbmg0LFxcbmg1LFxcbmg2LFxcbnAsXFxuYmxvY2txdW90ZSxcXG5wcmUsXFxuYSxcXG5hYmJyLFxcbmFjcm9ueW0sXFxuYWRkcmVzcyxcXG5iaWcsXFxuY2l0ZSxcXG5jb2RlLFxcbmRlbCxcXG5kZm4sXFxuZW0sXFxuaW1nLFxcbmlucyxcXG5rYmQsXFxucSxcXG5zLFxcbnNhbXAsXFxuc21hbGwsXFxuc3RyaWtlLFxcbnN0cm9uZyxcXG5zdWIsXFxuc3VwLFxcbnR0LFxcbnZhcixcXG5iLFxcbnUsXFxuaSxcXG5jZW50ZXIsXFxuZGwsXFxuZHQsXFxuZGQsXFxub2wsXFxudWwsXFxubGksXFxuZmllbGRzZXQsXFxuZm9ybSxcXG5sYWJlbCxcXG5sZWdlbmQsXFxudGFibGUsXFxuY2FwdGlvbixcXG50Ym9keSxcXG50Zm9vdCxcXG50aGVhZCxcXG50cixcXG50aCxcXG50ZCxcXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmNhbnZhcyxcXG5kZXRhaWxzLFxcbmVtYmVkLFxcbmZpZ3VyZSxcXG5maWdjYXB0aW9uLFxcbmZvb3RlcixcXG5oZWFkZXIsXFxuaGdyb3VwLFxcbm1lbnUsXFxubmF2LFxcbm91dHB1dCxcXG5ydWJ5LFxcbnNlY3Rpb24sXFxuc3VtbWFyeSxcXG50aW1lLFxcbm1hcmssXFxuYXVkaW8sXFxudmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmRldGFpbHMsXFxuZmlnY2FwdGlvbixcXG5maWd1cmUsXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5oZ3JvdXAsXFxubWVudSxcXG5uYXYsXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMTtcXG59XFxub2wsXFxudWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSxcXG5xIHtcXG4gIHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsXFxuYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSxcXG5xOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG4vKi8vLy8vLy8vLy8vLy8vIEVORCBPRiBDU1MgUkVTRVQgLy8vLy8vLy8vLy8vLy8vLyovXFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJzgtQml0JztcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcblxcbjpyb290IHtcXG4gIGZvbnQtc2l6ZTogMTBweDtcXG4gIGZvbnQtZmFtaWx5OiAnOC1CaXQnLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA0ZnIgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg5Y2ZmMDtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNi41ZnI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5odW1hbkNvbnRhaW5lciB7XFxuICBncmlkLWNvbHVtbjogMSAvIDI7XFxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjAsIDIwMCwgMjgpOyAqL1xcbn1cXG5cXG4ucm9ib3RDb250YWluZXIge1xcbiAgZ3JpZC1yb3c6IDEgLyAyO1xcbiAgZ3JpZC1jb2x1bW46IC0yIC8gLTE7XFxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoOTAsIDkwLCAyNTUpOyAqL1xcbn1cXG5cXG4udGl0bGUge1xcbiAgZGlzcGxheTogZ3JpZHM7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDdyZW07XFxuICBjb2xvcjogd2hpdGU7XFxuICBhbGlnbi1zZWxmOiBlbmQ7XFxuICB0ZXh0LXNoYWRvdzogLTJweCAtMnB4IDAgIzAwMCwgMnB4IC0ycHggMCAjMDAwLCAtMnB4IDJweCAwICMwMDAsXFxuICAgIDJweCAycHggMCAjMDAwLCAwcHggMnB4IDRweCBibGFjaztcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGFsaWduLXNlbGY6IHN0YXJ0O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5LCAxMjUsIDI1NSk7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIHdpZHRoOiA1MDBweDtcXG4gIGhlaWdodDogNTAwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBib3gtc2hhZG93OiAwcHggMnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuNTU2KTtcXG59XFxuXFxuLyogLmEtMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMC43NSk7XFxufVxcbi5hLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xcbn0gKi9cXG5cXG4uc3F1YXJlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgcGFkZGluZzogMnB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogNnJlbTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtc2hhZG93OiAtMnB4IC0ycHggMCAjMDAwLCAycHggLTJweCAwICMwMDAsIC0ycHggMnB4IDAgIzAwMCxcXG4gICAgMnB4IDJweCAwICMwMDAsIDBweCAycHggNHB4IGJsYWNrO1xcbn1cXG5cXG4uc3F1YXJlLmFjdGl2ZTpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMC41KTtcXG59XFxuXFxuLmluZm8ge1xcbiAgZ3JpZC1yb3c6IC0yIC8gLTE7XFxuICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogcmdiKDIwNSwgMjgsIDI4KTsgKi9cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5wbGF5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XFxuICB3aWR0aDogMjAwcHg7XFxuICBoZWlnaHQ6IDc1cHg7XFxuICBmb250LWZhbWlseTogJzgtQml0Jywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogNXJlbTtcXG4gIGJvcmRlcjogNHB4IHNvbGlkIHJnYigwLCAyNTUsIDApO1xcbiAgYm94LXNoYWRvdzogMCAwIDRweCBibGFjaztcXG4gIGNvbG9yOiByZ2IoMCwgMjU1LCAwKTtcXG4gIHRleHQtc2hhZG93OiAtMnB4IC0ycHggMCAjMDAwLCAycHggLTJweCAwICMwMDAsIC0ycHggMnB4IDAgIzAwMCxcXG4gICAgMnB4IDJweCAwICMwMDA7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbn1cXG5cXG4ucGxheTpob3ZlciB7XFxuICBib3JkZXI6IDRweCBzb2xpZCByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMjU1LCAwKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxufVxcblxcbi5wbGF5OmFjdGl2ZSB7XFxuICB3aWR0aDogMTk4cHg7XFxuICBoZWlnaHQ6IDc0LjI1cHg7XFxuICBmb250LXNpemU6IDQuOTVyZW07XFxuICBib3gtc2hhZG93OiAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC45MDEpO1xcbiAgbWFyZ2luOiAwcHggMXB4O1xcbn1cXG5cXG4uZ3Vlc3NlcyB7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LXNpemU6IDZyZW07XFxuICB0ZXh0LXNoYWRvdzogLTJweCAtMnB4IDAgIzAwMCwgMnB4IC0ycHggMCAjMDAwLCAtMnB4IDJweCAwICMwMDAsXFxuICAgIDJweCAycHggMCAjMDAwLCAwcHggMnB4IDRweCBibGFjaztcXG59XFxuXFxuZm9ybSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTVweDtcXG59XFxuXFxubGFiZWwge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZm9udC1zaXplOiA2cmVtO1xcbiAgdGV4dC1zaGFkb3c6IC0ycHggLTJweCAwICMwMDAsIDJweCAtMnB4IDAgIzAwMCwgLTJweCAycHggMCAjMDAwLFxcbiAgICAycHggMnB4IDAgIzAwMCwgMHB4IDJweCA0cHggYmxhY2s7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xcbn1cXG5cXG5mb3JtID4gaW5wdXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgYmxhY2s7XFxuICBoZWlnaHQ6IDRyZW07XFxuICB3aWR0aDogMjUwcHg7XFxuICBmb250LXNpemU6IDVyZW07XFxuICBmb250LWZhbWlseTogJzgtQml0Jywgc2Fucy1zZXJpZjtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBjb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUpO1xcbiAgdGV4dC1zaGFkb3c6IC0ycHggLTJweCAwICMwMDAsIDJweCAtMnB4IDAgIzAwMCwgLTJweCAycHggMCAjMDAwLFxcbiAgICAycHggMnB4IDAgIzAwMDtcXG59XFxuXFxuZm9ybSA+IC5wbGF5IHtcXG59XFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxxQkFBcUI7QUFDckI7OztFQUdFLHNCQUFzQjtBQUN4Qjs7QUFFQTs7O0NBR0M7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWlGRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLFNBQVM7RUFDVCxlQUFlO0VBQ2YsYUFBYTtFQUNiLHdCQUF3QjtBQUMxQjtBQUNBLGdEQUFnRDtBQUNoRDs7Ozs7Ozs7Ozs7RUFXRSxjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCO0FBQ0E7O0VBRUUsZ0JBQWdCO0FBQ2xCO0FBQ0E7O0VBRUUsWUFBWTtBQUNkO0FBQ0E7Ozs7RUFJRSxXQUFXO0VBQ1gsYUFBYTtBQUNmO0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsaUJBQWlCO0FBQ25COztBQUVBLG1EQUFtRDs7QUFFbkQ7RUFDRSxvQkFBb0I7RUFDcEIsNENBQW1DO0VBQ25DLGtCQUFrQjtFQUNsQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYiwyQkFBMkI7RUFDM0IsOEJBQThCO0VBQzlCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixhQUFhO0VBQ2IsNkJBQTZCO0VBQzdCLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsd0NBQXdDO0FBQzFDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQix3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRSxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixZQUFZO0VBQ1osZUFBZTtFQUNmO3FDQUNtQztBQUNyQzs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixtQ0FBbUM7RUFDbkMsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLGtDQUFrQztFQUNsQyxxQ0FBcUM7RUFDckMsNENBQTRDO0FBQzlDOztBQUVBOzs7OztHQUtHOztBQUVIO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLFlBQVk7RUFDWjtxQ0FDbUM7QUFDckM7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQix3Q0FBd0M7RUFDeEMsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx3Q0FBd0M7RUFDeEMsWUFBWTtFQUNaLFlBQVk7RUFDWixnQ0FBZ0M7RUFDaEMsZUFBZTtFQUNmLGdDQUFnQztFQUNoQyx5QkFBeUI7RUFDekIscUJBQXFCO0VBQ3JCO2tCQUNnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxvQ0FBb0M7RUFDcEMsZ0NBQWdDO0VBQ2hDLGVBQWU7RUFDZix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osZUFBZTtFQUNmLGtCQUFrQjtFQUNsQix3Q0FBd0M7RUFDeEMsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2Y7cUNBQ21DO0FBQ3JDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxZQUFZO0VBQ1osZUFBZTtFQUNmO3FDQUNtQztFQUNuQyxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsWUFBWTtFQUNaLDhCQUE4QjtFQUM5QixZQUFZO0VBQ1osWUFBWTtFQUNaLGVBQWU7RUFDZixnQ0FBZ0M7RUFDaEMsYUFBYTtFQUNiLHlCQUF5QjtFQUN6QjtrQkFDZ0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIEJveCBzaXppbmcgcnVsZXMgKi9cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4vKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCxcXG5ib2R5LFxcbmRpdixcXG5zcGFuLFxcbmFwcGxldCxcXG5vYmplY3QsXFxuaWZyYW1lLFxcbmgxLFxcbmgyLFxcbmgzLFxcbmg0LFxcbmg1LFxcbmg2LFxcbnAsXFxuYmxvY2txdW90ZSxcXG5wcmUsXFxuYSxcXG5hYmJyLFxcbmFjcm9ueW0sXFxuYWRkcmVzcyxcXG5iaWcsXFxuY2l0ZSxcXG5jb2RlLFxcbmRlbCxcXG5kZm4sXFxuZW0sXFxuaW1nLFxcbmlucyxcXG5rYmQsXFxucSxcXG5zLFxcbnNhbXAsXFxuc21hbGwsXFxuc3RyaWtlLFxcbnN0cm9uZyxcXG5zdWIsXFxuc3VwLFxcbnR0LFxcbnZhcixcXG5iLFxcbnUsXFxuaSxcXG5jZW50ZXIsXFxuZGwsXFxuZHQsXFxuZGQsXFxub2wsXFxudWwsXFxubGksXFxuZmllbGRzZXQsXFxuZm9ybSxcXG5sYWJlbCxcXG5sZWdlbmQsXFxudGFibGUsXFxuY2FwdGlvbixcXG50Ym9keSxcXG50Zm9vdCxcXG50aGVhZCxcXG50cixcXG50aCxcXG50ZCxcXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmNhbnZhcyxcXG5kZXRhaWxzLFxcbmVtYmVkLFxcbmZpZ3VyZSxcXG5maWdjYXB0aW9uLFxcbmZvb3RlcixcXG5oZWFkZXIsXFxuaGdyb3VwLFxcbm1lbnUsXFxubmF2LFxcbm91dHB1dCxcXG5ydWJ5LFxcbnNlY3Rpb24sXFxuc3VtbWFyeSxcXG50aW1lLFxcbm1hcmssXFxuYXVkaW8sXFxudmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmRldGFpbHMsXFxuZmlnY2FwdGlvbixcXG5maWd1cmUsXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5oZ3JvdXAsXFxubWVudSxcXG5uYXYsXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMTtcXG59XFxub2wsXFxudWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSxcXG5xIHtcXG4gIHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsXFxuYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSxcXG5xOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG4vKi8vLy8vLy8vLy8vLy8vIEVORCBPRiBDU1MgUkVTRVQgLy8vLy8vLy8vLy8vLy8vLyovXFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJzgtQml0JztcXG4gIHNyYzogdXJsKC4vZm9udHMvUGl4ZWJveS16OFhHRC50dGYpO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgZm9udC1mYW1pbHk6ICc4LUJpdCcsIHNhbnMtc2VyaWY7XFxufVxcblxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDRmciAxZnI7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjODljZmYwO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGdyaWQtcm93OiAxIC8gMjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA2LjVmcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmh1bWFuQ29udGFpbmVyIHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gMjtcXG4gIC8qIGJhY2tncm91bmQtY29sb3I6IHJnYigyMCwgMjAwLCAyOCk7ICovXFxufVxcblxcbi5yb2JvdENvbnRhaW5lciB7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBncmlkLWNvbHVtbjogLTIgLyAtMTtcXG4gIC8qIGJhY2tncm91bmQtY29sb3I6IHJnYig5MCwgOTAsIDI1NSk7ICovXFxufVxcblxcbi50aXRsZSB7XFxuICBkaXNwbGF5OiBncmlkcztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogN3JlbTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGFsaWduLXNlbGY6IGVuZDtcXG4gIHRleHQtc2hhZG93OiAtMnB4IC0ycHggMCAjMDAwLCAycHggLTJweCAwICMwMDAsIC0ycHggMnB4IDAgIzAwMCxcXG4gICAgMnB4IDJweCAwICMwMDAsIDBweCAycHggNHB4IGJsYWNrO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgYWxpZ24tc2VsZjogc3RhcnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTksIDEyNSwgMjU1KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgd2lkdGg6IDUwMHB4O1xcbiAgaGVpZ2h0OiA1MDBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gIGJveC1zaGFkb3c6IDBweCAycHggNnB4IHJnYmEoMCwgMCwgMCwgMC41NTYpO1xcbn1cXG5cXG4vKiAuYS0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjc1KTtcXG59XFxuLmEtMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XFxufSAqL1xcblxcbi5zcXVhcmUge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBwYWRkaW5nOiAycHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiA2cmVtO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1zaGFkb3c6IC0ycHggLTJweCAwICMwMDAsIDJweCAtMnB4IDAgIzAwMCwgLTJweCAycHggMCAjMDAwLFxcbiAgICAycHggMnB4IDAgIzAwMCwgMHB4IDJweCA0cHggYmxhY2s7XFxufVxcblxcbi5zcXVhcmUuYWN0aXZlOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjUpO1xcbn1cXG5cXG4uaW5mbyB7XFxuICBncmlkLXJvdzogLTIgLyAtMTtcXG4gIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjA1LCAyOCwgMjgpOyAqL1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnBsYXkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIGhlaWdodDogNzVweDtcXG4gIGZvbnQtZmFtaWx5OiAnOC1CaXQnLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiA1cmVtO1xcbiAgYm9yZGVyOiA0cHggc29saWQgcmdiKDAsIDI1NSwgMCk7XFxuICBib3gtc2hhZG93OiAwIDAgNHB4IGJsYWNrO1xcbiAgY29sb3I6IHJnYigwLCAyNTUsIDApO1xcbiAgdGV4dC1zaGFkb3c6IC0ycHggLTJweCAwICMwMDAsIDJweCAtMnB4IDAgIzAwMCwgLTJweCAycHggMCAjMDAwLFxcbiAgICAycHggMnB4IDAgIzAwMDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxufVxcblxcbi5wbGF5OmhvdmVyIHtcXG4gIGJvcmRlcjogNHB4IHNvbGlkIHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAyNTUsIDApO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG59XFxuXFxuLnBsYXk6YWN0aXZlIHtcXG4gIHdpZHRoOiAxOThweDtcXG4gIGhlaWdodDogNzQuMjVweDtcXG4gIGZvbnQtc2l6ZTogNC45NXJlbTtcXG4gIGJveC1zaGFkb3c6IDAgMCA2cHggcmdiYSgwLCAwLCAwLCAwLjkwMSk7XFxuICBtYXJnaW46IDBweCAxcHg7XFxufVxcblxcbi5ndWVzc2VzIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtc2l6ZTogNnJlbTtcXG4gIHRleHQtc2hhZG93OiAtMnB4IC0ycHggMCAjMDAwLCAycHggLTJweCAwICMwMDAsIC0ycHggMnB4IDAgIzAwMCxcXG4gICAgMnB4IDJweCAwICMwMDAsIDBweCAycHggNHB4IGJsYWNrO1xcbn1cXG5cXG5mb3JtIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxNXB4O1xcbn1cXG5cXG5sYWJlbCB7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LXNpemU6IDZyZW07XFxuICB0ZXh0LXNoYWRvdzogLTJweCAtMnB4IDAgIzAwMCwgMnB4IC0ycHggMCAjMDAwLCAtMnB4IDJweCAwICMwMDAsXFxuICAgIDJweCAycHggMCAjMDAwLCAwcHggMnB4IDRweCBibGFjaztcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207XFxufVxcblxcbmZvcm0gPiBpbnB1dCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBibGFjaztcXG4gIGhlaWdodDogNHJlbTtcXG4gIHdpZHRoOiAyNTBweDtcXG4gIGZvbnQtc2l6ZTogNXJlbTtcXG4gIGZvbnQtZmFtaWx5OiAnOC1CaXQnLCBzYW5zLXNlcmlmO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGNvbG9yOiByZ2IoMjQ1LCAyNDUsIDI0NSk7XFxuICB0ZXh0LXNoYWRvdzogLTJweCAtMnB4IDAgIzAwMCwgMnB4IC0ycHggMCAjMDAwLCAtMnB4IDJweCAwICMwMDAsXFxuICAgIDJweCAycHggMCAjMDAwO1xcbn1cXG5cXG5mb3JtID4gLnBsYXkge1xcbn1cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgYnVpbGRQYWdlIGZyb20gJy4vYnVpbGRQYWdlJztcbmltcG9ydCAqIGFzIERPTW1hbmlwIGZyb20gJy4vRE9NbWFuaXAnO1xuaW1wb3J0ICcuL3N0eWxlcy5jc3MnO1xuXG5idWlsZFBhZ2UoKTtcbkRPTW1hbmlwLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IFNoaXAgPSAobGVuZ3RoID0gMykgPT4gKHtcbiAgbGVuZ3RoLFxuICBoaXRzTnVtOiAwLFxuICBjb29yZHM6IFtdLFxuXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHNOdW0gKz0gMTtcbiAgfSxcblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0c051bSA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBhZGRDb29yZHMoY29vcmQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmNvb3Jkcy5wdXNoKGNvb3JkW2ldKTtcbiAgICB9XG4gIH0sXG59KTtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKDIpO1xuICBkZXN0cm95ZXIuYWRkQ29vcmRzKFtcbiAgICBbJ2MnLCA0XSxcbiAgICBbJ2MnLCA1XSxcbiAgXSk7XG5cbiAgY29uc3Qgc3VibWFyaW5lID0gU2hpcCgzKTtcbiAgc3VibWFyaW5lLmFkZENvb3JkcyhbXG4gICAgWydhJywgMV0sXG4gICAgWydhJywgMl0sXG4gICAgWydhJywgM10sXG4gIF0pO1xuXG4gIGNvbnN0IGNydWlzZXIgPSBTaGlwKDMpO1xuICBjcnVpc2VyLmFkZENvb3JkcyhbXG4gICAgWydlJywgN10sXG4gICAgWydmJywgN10sXG4gICAgWydnJywgN10sXG4gIF0pO1xuXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKDQpO1xuICBiYXR0bGVzaGlwLmFkZENvb3JkcyhbXG4gICAgWydkJywgMV0sXG4gICAgWydlJywgMV0sXG4gICAgWydmJywgMV0sXG4gICAgWydnJywgMV0sXG4gIF0pO1xuXG4gIGNvbnN0IGNhcnJpZXIgPSBTaGlwKDUpO1xuICBjYXJyaWVyLmFkZENvb3JkcyhbXG4gICAgWydiJywgM10sXG4gICAgWydiJywgNF0sXG4gICAgWydiJywgNV0sXG4gICAgWydiJywgNl0sXG4gICAgWydiJywgN10sXG4gIF0pO1xuXG4gIHJldHVybiB7XG4gICAgc2hpcHM6IFtkZXN0cm95ZXIsIHN1Ym1hcmluZSwgY3J1aXNlciwgYmF0dGxlc2hpcCwgY2Fycmllcl0sXG4gICAgaGl0czogW10sXG4gICAgbWlzc2VzOiBbXSxcblxuICAgIHJlY2lldmVBdHRhY2sodGFyZ2V0Q29vcmRpbmF0ZXMpIHtcbiAgICAgIC8vIENoZWNrIGlmIHRoZSBjb29yZGluYXRlcyB3ZXJlIGFscmVhZHkgY2FsbGVkXG4gICAgICBjb25zdCBhbGxDYWxsZWQgPSBbLi4udGhpcy5oaXRzLCAuLi50aGlzLm1pc3Nlc107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbENhbGxlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGFyZ2V0Q29vcmRpbmF0ZXNbMF0gPT09IGFsbENhbGxlZFtpXVswXSAmJlxuICAgICAgICAgIHRhcmdldENvb3JkaW5hdGVzWzFdID09PSBhbGxDYWxsZWRbaV1bMV1cbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuICdyZXBlYXQnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2hpcHNbaV0uY29vcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5zaGlwc1tpXS5jb29yZHNbal1bMF0gPT09IHRhcmdldENvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICB0aGlzLnNoaXBzW2ldLmNvb3Jkc1tqXVsxXSA9PT0gdGFyZ2V0Q29vcmRpbmF0ZXNbMV1cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc2hpcHNbaV0uaGl0KCk7XG4gICAgICAgICAgICB0aGlzLmhpdHMucHVzaCh0YXJnZXRDb29yZGluYXRlcyk7XG4gICAgICAgICAgICByZXR1cm4gJ2hpdCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLm1pc3Nlcy5wdXNoKHRhcmdldENvb3JkaW5hdGVzKTtcbiAgICAgIHJldHVybiAnbWlzcyc7XG4gICAgfSxcbiAgfTtcbn07XG5cbmNvbnN0IEdhbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGxldHRlcnMgPSB7XG4gICAgMTogJ2EnLFxuICAgIDI6ICdiJyxcbiAgICAzOiAnYycsXG4gICAgNDogJ2QnLFxuICAgIDU6ICdlJyxcbiAgICA2OiAnZicsXG4gICAgNzogJ2cnLFxuICB9O1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAocGxheWVyKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXIuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghcGxheWVyLnNoaXBzW2ldLmlzU3VuaygpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgY29tcHV0ZXJUdXJuID0gKGh1bWFuLCByb2JvdCkgPT4ge1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICBsZXQgYXR0YWNrQ29vcmRzID0gW107XG4gICAgZG8ge1xuICAgICAgYXR0YWNrQ29vcmRzID0gW107XG4gICAgICBhdHRhY2tDb29yZHMucHVzaChsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcgKyAxKV0pO1xuICAgICAgYXR0YWNrQ29vcmRzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNyArIDEpKTtcblxuICAgICAgcmVzdWx0ID0gaHVtYW4ucmVjaWV2ZUF0dGFjayhhdHRhY2tDb29yZHMpO1xuICAgIH0gd2hpbGUgKHJlc3VsdCA9PT0gJ3JlcGVhdCcpO1xuXG4gICAgaWYgKHJlc3VsdCA9PT0gJ21pc3MnKSB7XG4gICAgICAvLyBMZXQgdGhlIHBsYXllciBrbm93IGl0IHdhcyBhIG1pc3MgYW5kIGNoYW5nZSBub3RoaW5nXG4gICAgICBET01tYW5pcC5kZWZlbmQoKS5taXNzKGF0dGFja0Nvb3Jkcyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgPT09ICdoaXQnKSB7XG4gICAgICBET01tYW5pcC5kZWZlbmQoKS5oaXQoYXR0YWNrQ29vcmRzKTtcbiAgICAgIC8vIElmIHRoZSBodW1hbiBpcyBkZWFkLCBlbmQgdGhlIGdhbWVcbiAgICAgIGlmIChhbGxTdW5rKGh1bWFuKSkge1xuICAgICAgICBET01tYW5pcC5kZWZlbmQoKS5nYW1lT3ZlcigpO1xuICAgICAgICAvLyBKdXN0IHJldHVyblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmUtZW5hYmxlIHRoZSBib2FyZCBmb3IgdGhlIG5leHQgdHVyblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb2JvdEJvYXJkID4gLnNxdWFyZScpLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAvLyBUdXJuIHRoZSBjbGFzcyBpZGVudGlmaWVyIGludG8gYSB2YWxpZCBhdHRhY2tcbiAgICAgICAgY29uc3QgbmV3QXR0YWNrQ29vcmRzID0gc3F1YXJlLmNsYXNzTGlzdFsxXS5zcGxpdCgnLScpO1xuICAgICAgICBuZXdBdHRhY2tDb29yZHNbMV0gPSBwYXJzZUludChuZXdBdHRhY2tDb29yZHNbMV0sIDEwKTtcblxuICAgICAgICBHYW1lKCkucGxheVR1cm4oaHVtYW4sIHJvYm90LCBuZXdBdHRhY2tDb29yZHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgRE9NbWFuaXAuYm9hcmQoKS5lbmFibGUoKTtcbiAgfTtcblxuICBjb25zdCBwbGF5VHVybiA9IChodW1hbiwgcm9ib3QsIGF0dGFja0Nvb3JkcykgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHJvYm90LnJlY2lldmVBdHRhY2soYXR0YWNrQ29vcmRzKTtcblxuICAgIGlmIChyZXN1bHQgPT09ICdyZXBlYXQnKSB7XG4gICAgICAvLyBMZXQgdGhlIHBsYXllciBrbm93IGl0J3MgYSByZXBlYXQgYW5kIGNoYW5nZSBub3RoaW5nXG4gICAgICBET01tYW5pcC5hdHRhY2soKS5yZXBlYXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCA9PT0gJ21pc3MnKSB7XG4gICAgICAvLyBBbGVydHMgdGhlIHVzZXJcbiAgICAgIERPTW1hbmlwLmF0dGFjaygpLm1pc3MoYXR0YWNrQ29vcmRzKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCA9PT0gJ2hpdCcpIHtcbiAgICAgIERPTW1hbmlwLmF0dGFjaygpLmhpdChhdHRhY2tDb29yZHMpO1xuICAgICAgLy8gSWYgdGhlIHJvYm90IGlzIGRlYWQsIGVuZCB0aGUgZ2FtbmVcbiAgICAgIGlmIChhbGxTdW5rKHJvYm90KSkge1xuICAgICAgICBET01tYW5pcC5hdHRhY2soKS5nYW1lT3ZlcigpO1xuICAgICAgICAvLyBEaXNhYmxlIHRoZSBib2FyZCBhbmQgcmV0dXJuXG4gICAgICAgIERPTW1hbmlwLmJvYXJkKCkuZGlzYWJsZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGlzYWJsZSB0aGUgYm9hcmQgYW5kIHdhaXRcbiAgICBET01tYW5pcC5ib2FyZCgpLmRpc2FibGUoKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gUGxheSB0aGUgY29tcHV0ZXIncyB0dXJuXG4gICAgICBjb21wdXRlclR1cm4oaHVtYW4sIHJvYm90KTtcbiAgICB9LCAxMDAwKTtcbiAgfTtcblxuICByZXR1cm4geyBwbGF5VHVybiwgY29tcHV0ZXJUdXJuLCBhbGxTdW5rIH07XG59O1xuXG5leHBvcnQgeyBTaGlwLCBHYW1lYm9hcmQgfTtcblxuKGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICBsZXQgaHVtYW4gPSBudWxsO1xuICBsZXQgcm9ib3QgPSBudWxsO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0gPiBidXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGh1bWFuID0gR2FtZWJvYXJkKCk7XG4gICAgcm9ib3QgPSBHYW1lYm9hcmQoKTtcbiAgICBET01tYW5pcC5ib2FyZCgpLnN0YXJ0KGUsIGh1bWFuKTtcblxuICAgIC8vIExvZ2ljYWxseSBsZXQgdGhlIHJvYm90IHNxdWFyZXMgc3RhcnQgYW4gYXR0YWNrXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvYm90Qm9hcmQgPiAuc3F1YXJlJykuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIC8vIFR1cm4gdGhlIGNsYXNzIGlkZW50aWZpZXIgaW50byBhIHZhbGlkIGF0dGFja1xuICAgICAgICBjb25zdCBhdHRhY2tDb29yZHMgPSBzcXVhcmUuY2xhc3NMaXN0WzFdLnNwbGl0KCctJyk7XG4gICAgICAgIGF0dGFja0Nvb3Jkc1sxXSA9IHBhcnNlSW50KGF0dGFja0Nvb3Jkc1sxXSwgMTApO1xuXG4gICAgICAgIEdhbWUoKS5wbGF5VHVybihodW1hbiwgcm9ib3QsIGF0dGFja0Nvb3Jkcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KSgpO1xuIl0sIm5hbWVzIjpbImFkZEV2ZW50TGlzdGVuZXJzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJsZXR0ZXJzIiwiYm9hcmQiLCJkaXNhYmxlIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJzcXVhcmUiLCJvbGRTcXVhcmUiLCJuZXdTcXVhcmUiLCJjbG9uZU5vZGUiLCJwYXJlbnRFbGVtZW50IiwicmVwbGFjZUNoaWxkIiwiZW5hYmxlIiwic3RhcnQiLCJodW1hbiIsImNvbXBvc2VkUGF0aCIsInRleHRDb250ZW50IiwiZWxlbWVudHMiLCJuYW1lIiwidmFsdWUiLCJpIiwic2hpcHMiLCJsZW5ndGgiLCJqIiwiY29vcmRzIiwiY29udGFpbnMiLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImF0dGFjayIsInJlcGVhdCIsImNvbG9yIiwibWlzcyIsInNxdWFyZUNvb3JkcyIsImNvbnNvbGUiLCJ0cmFjZSIsImhpdCIsImdhbWVPdmVyIiwiZGVmZW5kIiwiYnVpbGQiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVBZGRlciIsInF1ZXJ5IiwiYXR0cmlidXRlIiwidG9TZXQiLCJlbGVtZW50IiwiYnVpbGRQYWdlIiwiRE9NbWFuaXAiLCJTaGlwIiwiaGl0c051bSIsImlzU3VuayIsImFkZENvb3JkcyIsImNvb3JkIiwicHVzaCIsIkdhbWVib2FyZCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsImNydWlzZXIiLCJiYXR0bGVzaGlwIiwiY2FycmllciIsImhpdHMiLCJtaXNzZXMiLCJyZWNpZXZlQXR0YWNrIiwidGFyZ2V0Q29vcmRpbmF0ZXMiLCJhbGxDYWxsZWQiLCJHYW1lIiwiYWxsU3VuayIsInBsYXllciIsImNvbXB1dGVyVHVybiIsInJvYm90IiwicmVzdWx0IiwiYXR0YWNrQ29vcmRzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibmV3QXR0YWNrQ29vcmRzIiwic3BsaXQiLCJwYXJzZUludCIsInBsYXlUdXJuIiwic2V0VGltZW91dCIsInByZXZlbnREZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==