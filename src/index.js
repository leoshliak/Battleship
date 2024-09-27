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
const shipName1 = document.querySelector('#ship-name1');
const shipName2 = document.querySelector('#ship-name2');
const shipName3 = document.querySelector('#ship-name3');
const dialog1VS1 = document.querySelector('.dialog__1-vs-1');
const firstPlayerBoard = document.querySelector('.first-player-board');
const secondPlayerBoard = document.querySelector('.second-player-board');
const rotateBtn2 = document.querySelector('.first-player-rotate');
const rotateBtn3 = document.querySelector('.second-player-rotate');
const firstPlayerContainer = document.querySelector('.first-player-container');
const dots = document.querySelectorAll('.dot');
const secondPlayerContainer = document.querySelector('.second-player-container');
const container1vs1 = document.querySelector('.container__1-vs-1');

let playVS = 'Computer'
let direct = 'horizontal';
let player;
let computer;
let player2;
let playerShipPlaced = 0;
let gameStarted = false;;
let turn = '1st Player'

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
        cell.classList.add('default');
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
  if(gameStarted == true) {
    player = undefined;
    player2 = undefined;
    computer = undefined;
    dialogBoard1.innerHTML = '';
    firstPlayerBoard.innerHTML = '';
    secondPlayerBoard.innerHTML = '';
    direct = 'horizontal';
    playerShipPlaced = 0;
    gameStarted = false;
    resetBtn.style.opacity = 1;
    turn = '1st Player';
    container1vs1.style.display = 'block';
    board1.style.opacity = 1;
    board2.style.opacity = 1;
    board1.innerHTML = '';
    board2.innerHTML = '';
    buildBoard1();
    buildBoard2(); 
  }

  if(selectType.value == 'Computer') {
    playVS = 'Computer';
    shipName1.textContent = 'Carrier';
    board1Text.textContent = 'Your Board';
    board2Text.textContent = 'Enemy Board';
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
    const compCells = document.querySelectorAll('.grid-cell-board2');
    compCells.forEach(cell => cell.classList.add('enemy'));
   computer.placeShipsRandomly();
   dialogVScomputer.showModal();
  } else if(selectType.value == 'Player') {
    shipName2.textContent = 'Carrier';
    shipName3.textContent = 'Carrier';
    playVS = 'Player';
    board1Text.textContent = '1st Player Board';
    board2Text.textContent = '2nd Player Board';
    let x = 0;
    let y = 10;
    for(let i = 0; i < 100; i++) {
      x = x + 1;
       if(x > 10) {
         x = 1;
         y = y - 1;
       }

       let cell1 = document.createElement("div");
       cell1.classList.add('grid-cell-dialog2');
       cell1.classList.add('default');
       cell1.setAttribute('x-data', `${x -1}`);
       cell1.setAttribute('y-data', `${y -1}`);
       firstPlayerBoard.insertAdjacentElement("beforeend", cell1);

       let cell2 = document.createElement("div");
       cell2.classList.add('grid-cell-dialog3');
       cell2.classList.add('default');
       cell2.setAttribute('x-data', `${x -1}`);
       cell2.setAttribute('y-data', `${y -1}`);
       secondPlayerBoard.insertAdjacentElement("beforeend", cell2);
       
       player = new Player('Player', 10, 5);
       player2 = new Player('Player', 10, 5);
       const p1Cells = document.querySelectorAll('.grid-cell-board1');
       p1Cells.forEach(cell => cell.classList.add('enemy'));
       const p2Cells = document.querySelectorAll('.grid-cell-board2');
       p2Cells.forEach(cell => cell.classList.add('enemy'));
       dialog1VS1.showModal();
       
       container1vs1.style.display = 'flex';
   }
  }
 });
 
 function highlightCells(cell, cellClass) {
  let shipLengths = [5, 4, 3, 3, 2]; 

  const x = parseInt(cell.getAttribute('x-data'), 10);
  const y = parseInt(cell.getAttribute('y-data'), 10);
  
  document.querySelectorAll('.grid-cell-dialog.hovered').forEach(c => {
      c.classList.remove('hovered');
  });

  for (let i = 0; i < shipLengths[playerShipPlaced]; i++) {
    if(direct === 'horizontal') {
      const nextCell = document.querySelector(`.${cellClass}[x-data="${x + i}"][y-data="${y}"]`);
      if (nextCell) {
        nextCell.classList.add('hovered');
    }
    }else {
      const nextCell = document.querySelector(`.${cellClass}[x-data="${x}"][y-data="${y + i}"]`);
    
      if (nextCell) {
          nextCell.classList.add('hovered');
      }
    }
  }
}

dialogBoard1.addEventListener('mouseover', (event) => {
  if (event.target.classList.contains('grid-cell-dialog')) {
      highlightCells(event.target, 'grid-cell-dialog');
  }
});

dialogBoard1.addEventListener('mouseleave', () => {
  document.querySelectorAll('.grid-cell-dialog.hovered').forEach(c => {
    c.classList.remove('hovered');
});
});

firstPlayerBoard.addEventListener('mouseover', (event) =>{
  if (event.target.classList.contains('grid-cell-dialog2')) {
    document.querySelectorAll('.grid-cell-dialog2.hovered').forEach(c => {
      c.classList.remove('hovered');})
    highlightCells(event.target, 'grid-cell-dialog2');
}
});

firstPlayerBoard.addEventListener('mouseleave', () => {
  document.querySelectorAll('.grid-cell-dialog2.hovered').forEach(c => {
    c.classList.remove('hovered');
});
});


secondPlayerBoard.addEventListener('mouseover', (event) => {
  if (event.target.classList.contains('grid-cell-dialog3')) {
    document.querySelectorAll('.grid-cell-dialog3.hovered').forEach(c => {
      c.classList.remove('hovered');})
      highlightCells(event.target, 'grid-cell-dialog3');
}

});

secondPlayerBoard.addEventListener('mouseleave', () => {
  document.querySelectorAll('.grid-cell-dialog3.hovered').forEach(c => {
    c.classList.remove('hovered');
});
});

dialogBoard1.addEventListener('mouseleave', () => {
  document.querySelectorAll('.grid-cell-dialog.hovered').forEach(c => {
    c.classList.remove('hovered');
});
});

dialogBoard1.addEventListener('click', (event) =>{
   if(!event.target.classList.contains('grid-cell-dialog'))  return;
    let shipLengths = [5, 4, 3, 3, 2]; 
    const shipNames = ['Carrier', 'Battleship', 'Destroyer', 'Submarine',	'Patrol Boat'];
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
   shipName1.textContent = shipNames[playerShipPlaced];
   if(playerShipPlaced == 5) {
    dialogVScomputer.close();
    gameStarted = true;
   } 
   
});

firstPlayerBoard.addEventListener('click', (event) =>{
  if(!event.target.classList.contains('grid-cell-dialog2'))  return;
  let shipLengths = [5, 4, 3, 3, 2]; 
    const shipNames = ['Carrier', 'Battleship', 'Destroyer', 'Submarine',	'Patrol Boat'];
   const x = parseInt(event.target.getAttribute('x-data'), 10);
   const y = parseInt(event.target.getAttribute('y-data'), 10);
   player.gameBoard.placeShip(shipLengths[playerShipPlaced], x, y, direct);

   for (let i = 0; i < shipLengths[playerShipPlaced]; i++) {
    if(direct === 'horizontal') {
      const nextCell = document.querySelector(`.grid-cell-dialog2[x-data="${x + i}"][y-data="${y}"]`);
      if (nextCell) {
        nextCell.classList.add('selected');
    }
    }else {
      const nextCell = document.querySelector(`.grid-cell-dialog2[x-data="${x}"][y-data="${y + i}"]`);
    
      if (nextCell) {
          nextCell.classList.add('selected');
      }
    }
  }

   playerShipPlaced++;
   shipName2.textContent = shipNames[playerShipPlaced];
   if(playerShipPlaced == 5) {
    playerShipPlaced = 0;
    firstPlayerContainer.classList.add('show-2');
    secondPlayerContainer.classList.add('show-2');
    dots[0].classList.remove('active');
    dots[1].classList.add('active');
   } 
});

secondPlayerBoard.addEventListener('click', (event) => {
  if(!event.target.classList.contains('grid-cell-dialog3'))  return;
  let shipLengths = [5, 4, 3, 3, 2]; 
    const shipNames = ['Carrier', 'Battleship', 'Destroyer', 'Submarine',	'Patrol Boat'];
   const x = parseInt(event.target.getAttribute('x-data'), 10);
   const y = parseInt(event.target.getAttribute('y-data'), 10);
   player2.gameBoard.placeShip(shipLengths[playerShipPlaced], x, y, direct);

   for (let i = 0; i < shipLengths[playerShipPlaced]; i++) {
    if(direct === 'horizontal') {
      const nextCell = document.querySelector(`.grid-cell-dialog3[x-data="${x + i}"][y-data="${y}"]`);
      if (nextCell) {
        nextCell.classList.add('selected');
    }
    }else {
      const nextCell = document.querySelector(`.grid-cell-dialog3[x-data="${x}"][y-data="${y + i}"]`);
    
      if (nextCell) {
          nextCell.classList.add('selected');
      }
    }
  }

  playerShipPlaced++;
  shipName3.textContent = shipNames[playerShipPlaced];
  if(playerShipPlaced == 5) {
    resetBtn.style.opacity = 0.7;
    dialog1VS1.close();
    board1.style.opacity = 0.5;
    board2.style.opacity = 1;
    gameStarted = true;
    firstPlayerContainer.classList.remove('show-2');
    secondPlayerContainer.classList.remove('show-2');
    dots[0].classList.add('active');
    dots[1].classList.remove('active');
  }
});

rotateBtn1.addEventListener('click', () => {
 if(direct === 'horizontal') {
  direct = 'vertical';
 } else if(direct === 'vertical') {
  direct = 'horizontal';
 }
});

rotateBtn2.addEventListener('click', () => {
  if(direct === 'horizontal') {
   direct = 'vertical';
  } else if(direct === 'vertical') {
   direct = 'horizontal';
  }
 });

 rotateBtn3.addEventListener('click', () => {
  if(direct === 'horizontal') {
   direct = 'vertical';
  } else if(direct === 'vertical') {
   direct = 'horizontal';
  }
 });

 board1.addEventListener('click', (event) => {
  if(!event.target.classList.contains('grid-cell-board1')) return;
  if(!gameStarted) return;
  if(event.target.classList.contains('shotted')) return;

  const coordX = parseInt(event.target.getAttribute('x-data'), 10);
  const coordY = parseInt(event.target.getAttribute('y-data'), 10);

  const cell = document.querySelector(`.grid-cell-board1[x-data="${coordX}"][y-data="${coordY}"]`);
  try {
    if(playVS == 'Player') {
      if(turn == '2nd Player') {
      
      player.gameBoard.receiveAttack(coordX, coordY);
      const player2MissedShots = player.gameBoard.missedShots;
  cell.classList.add('shotted');

  const isMiss = player2MissedShots.some(shot => shot.x === coordX && shot.y === coordY);

  if (isMiss) {
    const missDot = document.createElement('span');
    missDot.classList.add('miss');
    cell.appendChild(missDot);
  } else {
    const hitDot = document.createElement('span');
    hitDot.classList.add('hit');
    cell.appendChild(hitDot);
  }

  turn = '1st Player';
  board1.style.opacity = 0.5;
  board2.style.opacity = 1;

  if(player.gameBoard.allShipsSunk()) {
    const resultTitle = document.querySelector(".result-title");
    resultTitle.classList.add('for-players');
    resultTitle.textContent = "2nd Player won!";
    const resultDes = document.querySelector('.result-des');
    resultDes.textContent = "The battle is over";
    dialogResult.showModal();
    gameStarted = false;
    player = undefined;
    player2 = undefined;
    computer = undefined;
    dialogBoard1.innerHTML = '';
    firstPlayerBoard.innerHTML = '';
    secondPlayerBoard.innerHTML = '';
    direct = 'horizontal';
    container1vs1.style.display = 'block';
    playerShipPlaced = 0;
    gameStarted = false;
    board1.style.opacity = 1;
    board2.style.opacity = 1;
    board1.innerHTML = '';
    board2.innerHTML = '';
    resetBtn.style.opacity = 1;
    buildBoard1();
    buildBoard2(); 
  }

}
    }
  } catch (error) {
    console.error('Error:', error);
  }
 });

board2.addEventListener('click', (event) => {
  if(!event.target.classList.contains('grid-cell-board2')) return;
  if(!gameStarted) return;
  if(event.target.classList.contains('shotted')) return;

    const coordX = parseInt(event.target.getAttribute('x-data'), 10);
    const coordY = parseInt(event.target.getAttribute('y-data'), 10);

    const cell = document.querySelector(`.grid-cell-board2[x-data="${coordX}"][y-data="${coordY}"]`);
  try{
  if(playVS == 'Computer') {
  computer.gameBoard.receiveAttack(coordX, coordY);
  const playerMissedShots = computer.gameBoard.missedShots;
  cell.classList.add('shotted');

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

if(computer.gameBoard.allShipsSunk()) {
  const resultTitle = document.querySelector('.result-title');
  resultTitle.classList.add('win')
  resultTitle.textContent = 'You won!';
  const resultDes = document.querySelector('.result-des');
  resultDes.textContent = "All of enemy's ships are sunk";
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
  resetBtn.style.opacity = 1;
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
        cell2.classList.add('shotted');
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
  resetBtn.style.opacity = 1;
  buildBoard1();
  buildBoard2(); 
}

 } else if(playVS == 'Player') {
  if(turn == '1st Player') {
  player2.gameBoard.receiveAttack(coordX, coordY);
  const playerMissedShots = player2.gameBoard.missedShots;
  cell.classList.add('shotted');

  const isMiss = playerMissedShots.some(shot => shot.x === coordX && shot.y === coordY);

  if (isMiss) {
    const missDot = document.createElement('span');
    missDot.classList.add('miss');
    cell.appendChild(missDot);
    
  } else {
    const hitDot = document.createElement('span');
    hitDot.classList.add('hit');
    cell.appendChild(hitDot);
  }
  
  turn = '2nd Player';
  board1.style.opacity = 1;
  board2.style.opacity = 0.5;

  if(player2.gameBoard.allShipsSunk()) {
    const resultTitle = document.querySelector(".result-title");
    resultTitle.classList.add('for-players');
    resultTitle.textContent = "1st Player won!";
    const resultDes = document.querySelector('.result-des');
    resultDes.textContent = "The battle is over";
    dialogResult.showModal();
    gameStarted = false;
    player = undefined;
    player2 = undefined;
    computer = undefined;
    dialogBoard1.innerHTML = '';
    firstPlayerBoard.innerHTML = '';
    secondPlayerBoard.innerHTML = '';
    direct = 'horizontal';
    container1vs1.style.display = 'block';
    playerShipPlaced = 0;
    gameStarted = false;
    board1.style.opacity = 1;
    board2.style.opacity = 1;
    board1.innerHTML = '';
    board2.innerHTML = '';
    turn = '1st Player';
    resetBtn.style.opacity = 1;
    buildBoard1();
    buildBoard2(); 
    }
  }
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
  } else if(resultTitle.classList.contains('lose')) {
    resultTitle.classList.remove('lose');
  } else {
    resultTitle.classList.remove('for-players');
  }
}

function onAnimationEnd() {
  dialogResult.classList.remove('hide');
  dialogResult.close();

  dialogResult.removeEventListener('animationend', onAnimationEnd, false);
}

resetBtn.addEventListener('click', () =>{
  if(playVS == 'Computer') {
    const playerAllShips = player.gameBoard.board;
    for(let ship of playerAllShips) {
      ship.damage = 0;
      ship.sunk = false;
    }
    const board1Cells = document.querySelectorAll('.grid-cell-board1');
    board1Cells.forEach(cell => {
      cell.classList.remove('shotted');
      cell.innerHTML = '';
   });
    computer = new Player('Computer', 10, 5);
    computer.placeShipsRandomly();
    const board2Cells = document.querySelectorAll('.grid-cell-board2');
    board2Cells.forEach(cell => {
       cell.classList.remove('shotted');
       cell.innerHTML = '';
    });
  }
})