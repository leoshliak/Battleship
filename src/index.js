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
const resetBtn = document.querySelector('.reset-btn');
const newGameBtn = document.querySelector('.new-btn');
const dialogBoard1 = document.querySelector('.dialog-board1');
const rotateBtn1 = document.querySelector('.dialog1-rotate');
let direct = 'horizontal';
let player;
let computer;
let playerShipPlaced = 0;
let gameStarted = false;

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
        cell.setAttribute('x-data', `${x - 1}`);
        cell.setAttribute('y-data', `${y - 1}`);
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
        cell.setAttribute('x-data', `${x - 1}`);
        cell.setAttribute('y-data', `${y - 1}`);
        board2.insertAdjacentElement("beforeend", cell);
    }
 }

 selectType.addEventListener('change', () =>{
  if(gameStarted === true) return;
  else{
    if(selectType.value === 'Computer') {
   board1Text.textContent = 'Your Board';
   board2Text.textContent = 'Enemy Board';
    } else if(selectType.value === 'Player') {
      board1Text.textContent = '1st Player Board';
      board2Text.textContent = '2nd Player Board';
    }
  }
 });

 newGameBtn.addEventListener('click', () => { 
  if(selectType.value == 'Computer') {
    if(gameStarted == true) {
      player = undefined;
      computer = undefined;
      dialogBoard1.innerHTML = '';
      direct = 'horizontal';
      playerShipPlaced = 0;
      gameStarted = false;
    }
   let x = 0;
    let y = 10;
   for(let i = 0; i < 100; i++) {
      x = x + 1;
       if(x > 10) {
         x = 1;
         y = y - 1;
       }
       let cell = document.createElement("div");
       cell.classList.add('grid-cell-dialog');
       cell.classList.add('default');
       cell.setAttribute('x-data', `${x -1}`);
       cell.setAttribute('y-data', `${y -1}`);
       dialogBoard1.insertAdjacentElement("beforeend", cell);
   }
    player = new Player('Player', 10, 5);
    computer = new Player('Computer', 10, 5);
   computer.placeShipsRandomly();
   console.log(computer);
   dialogVScomputer.showModal();
  }
 });
 
 function highlightCells(cell) {
  let shipLengths = [5, 4, 3, 3, 2]; 

  const x = parseInt(cell.getAttribute('x-data'), 10);
  const y = parseInt(cell.getAttribute('y-data'), 10);
  
  document.querySelectorAll('.grid-cell-dialog.hovered').forEach(c => {
      c.classList.remove('hovered');
  });

  for (let i = 0; i < shipLengths[playerShipPlaced]; i++) {
    if(direct === 'horizontal') {
      const nextCell = document.querySelector(`.grid-cell-dialog[x-data="${x + i}"][y-data="${y}"]`);
      if (nextCell) {
        nextCell.classList.add('hovered');
    }
    }else {
      const nextCell = document.querySelector(`.grid-cell-dialog[x-data="${x}"][y-data="${y + i}"]`);
    
      if (nextCell) {
          nextCell.classList.add('hovered');
      }
    }
  }
}

dialogBoard1.addEventListener('mouseover', (event) => {
  if (event.target.classList.contains('grid-cell-dialog')) {
      highlightCells(event.target);
  }
});

dialogBoard1.addEventListener('mouseleave', () => {
  document.querySelectorAll('.grid-cell-dialog.hovered').forEach(c => {
    c.classList.remove('hovered');
});
});

dialogBoard1.addEventListener('click', (event) =>{
   if(!event.target.classList.contains('grid-cell-dialog'))  return;
    let shipLengths = [5, 4, 3, 3, 2]; 
   const x = parseInt(event.target.getAttribute('x-data'), 10);
   const y = parseInt(event.target.getAttribute('y-data'), 10);
   player.gameBoard.placeShip(shipLengths[playerShipPlaced], x, y, direct);


   for (let i = 0; i < shipLengths[playerShipPlaced]; i++) {
    if(direct === 'horizontal') {
      const nextCell = document.querySelector(`.grid-cell-dialog[x-data="${x + i}"][y-data="${y}"]`);
      if (nextCell) {
        nextCell.classList.add('selected');
    }
    }else {
      const nextCell = document.querySelector(`.grid-cell-dialog[x-data="${x}"][y-data="${y + i}"]`);
    
      if (nextCell) {
          nextCell.classList.add('selected');
      }
    }
  }

   playerShipPlaced++;
   console.log(player);
   if(playerShipPlaced == 5) {
    dialogVScomputer.close();
    gameStarted = true;
   } 
   
})

rotateBtn1.addEventListener('click', () => {
 if(direct === 'horizontal') {
  direct = 'vertical';
 } else if(direct === 'vertical') {
  direct = 'horizontal';
 }
});


 buildBoard1();
 buildBoard2();