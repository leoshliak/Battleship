import _ from 'lodash';
import './style.css';

const Ship = require('./scripts/ship'); 
const Player = require('./scripts/player');
const Gameboard = require('./scripts/gameboard');

const board1 = document.querySelector('.board-1');
const board2 = document.querySelector('.board-2');

 function buildBoard1() {
    let x = 0;
    let y = 10;

    for(let i = 0; i < 100; i++) {
       x = x + 1;
        if(x > 10) {
          x = 1;
          y = y - 1;
        }
        let cell = document.createElement("div");
        cell.classList.add('grid-cell');
        cell.setAttribute('x-data', `${x}`);
        cell.setAttribute('y-data', `${y}`);
        board1.insertAdjacentElement("beforeend", cell);
    }
 }
 
 function buildBoard2() {
    let x = 0;
    let y = 10;

    for(let i = 0; i < 100; i++) {
        x = x + 1;
        if(x > 10) {
          x = 1;
          y = y - 1;
        }
        let cell = document.createElement("div");
        cell.classList.add('grid-cell');
        cell.setAttribute('x-data', `${x}`);
        cell.setAttribute('y-data', `${y}`);
        board2.insertAdjacentElement("beforeend", cell);
    }
 }


 buildBoard1();
 buildBoard2();