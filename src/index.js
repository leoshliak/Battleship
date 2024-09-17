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
const dialogResult = document.querySelector('.dialog-result');
const resultClose = document.querySelector('.result-close');
let playVS = 'Computer'
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
        cell.classList.add('grid-cell-board1');
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
        cell.classList.add('grid-cell-board2');
        cell.classList.add('default-enemy');
        cell.setAttribute('x-data', `${x - 1}`);
        cell.setAttribute('y-data', `${y - 1}`);
        board2.insertAdjacentElement("beforeend", cell);
    }
 }
 
 buildBoard1();
 buildBoard2();

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
      board1.innerHTML = '';
      board2.innerHTML = '';
      buildBoard1();
      buildBoard2(); 
    }

    playVS = 'Computer';
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

  for (let i = 0; i < shipLengths[playerShipPlaced]; i++) {
    if(direct === 'horizontal') {
      const nextCell = document.querySelector(`.grid-cell-board1[x-data="${x + i}"][y-data="${y}"]`);
      if (nextCell) {
        nextCell.classList.add('selected');
    }
    }else {
      const nextCell = document.querySelector(`.grid-cell-board1[x-data="${x}"][y-data="${y + i}"]`);
    
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

board2.addEventListener('click', (event) => {
  if(!event.target.classList.contains('grid-cell-board2')) return;
  if(!gameStarted) return;
  if(event.target.classList.contains('shoted')) return;

    const coordX = parseInt(event.target.getAttribute('x-data'), 10);
    const coordY = parseInt(event.target.getAttribute('y-data'), 10);

    const cell = document.querySelector(`.grid-cell-board2[x-data="${coordX}"][y-data="${coordY}"]`);
  try{
  if(playVS == 'Computer') {
  computer.gameBoard.receiveAttack(coordX, coordY);
  const playerMissedShots = computer.gameBoard.missedShots;
  cell.classList.add('shoted');

  const isMiss1 = playerMissedShots.some(shot => shot.x === coordX && shot.y === coordY);

if (isMiss1) {
  const missDot = document.createElement('span');
  missDot.classList.add('miss');
  cell.appendChild(missDot);
} else {
  const hitDot = document.createElement('span');
  hitDot.classList.add('hit');
  cell.appendChild(hitDot);
}


cell.classList.add('shoted');

if(computer.gameBoard.allShipsSunk()) {
  const resultTitle = document.querySelector('.result-title');
  resultTitle.classList.add('win')
  resultTitle.textContent = 'You won!';
  const resultDes = document.querySelector('.result-des');
  resultDes.textContent = 'All of enemy ships are sunk';
  dialogResult.showModal();
  gameStarted = false;
  player = undefined;
  computer = undefined;
  dialogBoard1.innerHTML = '';
  direct = 'horizontal';
  playerShipPlaced = 0;
  gameStarted = false;
  board1.innerHTML = '';
  board2.innerHTML = '';
  buildBoard1();
  buildBoard2(); 
}



computer.randomAttack(player);
  const compMissedShots = player.gameBoard.missedShots;
  const compAllShots = player.gameBoard.shotOrder;
  const compX = compAllShots[compAllShots.length-1].x;
  const compY = compAllShots[compAllShots.length-1].y;
  const cell2 = document.querySelector(`.grid-cell-board1[x-data="${compX}"][y-data="${compY}"]`);
  const isMiss2 = compMissedShots.some(shot => shot.x === compX && shot.y === compY);
  if (isMiss2) {
    if (!cell2.querySelector('.miss')) {  
        const missDot2 = document.createElement('span');
        missDot2.classList.add('miss');
        cell2.appendChild(missDot2);
    }
} else {
    if (!cell2.querySelector('.hit')) {  
        const hitDot2 = document.createElement('span');
        hitDot2.classList.add('hit');
        cell2.appendChild(hitDot2);
    }
}

if(player.gameBoard.allShipsSunk()) {
  const resultTitle = document.querySelector('.result-title');
  resultTitle.classList.add('lode');
  resultTitle.textContent = 'You Lost(';
  const resultDes = document.querySelector('.result-des');
  resultDes.textContent = 'All of your ships are sunk';
  dialogResult.showModal();
  gameStarted = false;
  player = undefined;
  computer = undefined;
  dialogBoard1.innerHTML = '';
  direct = 'horizontal';
  playerShipPlaced = 0;
  gameStarted = false;
  board1.innerHTML = '';
  board2.innerHTML = '';
  buildBoard1();
  buildBoard2(); 
}

  console.log(compAllShots);
  console.log(player.gameBoard.board);
  console.log(computer.gameBoard.board);

 }
} catch (error) {
  console.error('Error:', error);
}
});
 
resultClose.addEventListener('click', () => {
  dialogResult.classList.add('hide');
  dialogResult.addEventListener('animationend', onAnimationEnd, false);

  
  setTimeout(removeResultClasses , 1200);
 
});

function removeResultClasses() {
  const resultTitle = document.querySelector('.result-title');
   if(resultTitle.classList.contains('win')) {
    resultTitle.classList.remove('win');
  } else {
    resultTitle.classList.remove('lose');
  }
}

function onAnimationEnd() {
  dialogResult.classList.remove('hide');
  dialogResult.close();

  dialogResult.removeEventListener('animationend', onAnimationEnd, false);
}
