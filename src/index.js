import _ from 'lodash';
import './style.css';

const Ship = require('./scripts/ship'); 
const Player = require('./scripts/player');
const Gameboard = require('./scripts/gameboard');

const board1 = document.querySelector('.board-1');
const board2 = document.querySelector('.board-2');
const selectType = document.getElementById('type');
const board1Text = document.getElementById('board1-text');
const board2Text = document.getElementById('board2-text');
const dialogVScomputer = document.querySelector('.play-vs__computer');
const startBtn = document.querySelector('.start-btn');
const dialogBoard1 = document.querySelector('.dialog-board1');

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
        cell.classList.add('default');
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
        cell.classList.add('default-enemy');
        cell.setAttribute('x-data', `${x}`);
        cell.setAttribute('y-data', `${y}`);
        board2.insertAdjacentElement("beforeend", cell);
    }
 }

 selectType.addEventListener('change', () =>{
    if(selectType.value === 'Computer') {
   board1Text.textContent = 'Your Board';
   board2Text.textContent = 'Enemy Board';
    } else if(selectType.value === 'Player') {
      board1Text.textContent = '1st Player Board';
      board2Text.textContent = '2nd Player Board';
    }
 });

 startBtn.addEventListener('click', () => { 
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
       cell.classList.add('default');
       cell.setAttribute('x-data', `${x}`);
       cell.setAttribute('y-data', `${y}`);
       dialogBoard1.insertAdjacentElement("beforeend", cell);
   }
   dialogVScomputer.showModal();
 });


 buildBoard1();
 buildBoard2();