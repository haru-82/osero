const SIZE = 8;
let board = Array(SIZE).fill(null).map(() => Array(SIZE).fill(null));
let currentPlayer = 'black';

board[3][3] = 'white';
board[3][4] = 'black';
board[4][3] = 'black';
board[4][4] = 'white';

const table = document.getElementById('board');

function renderBoard() {
  table.innerHTML = '';
  for (let y = 0; y < SIZE; y++) {
    const row = document.createElement('tr');
    for (let x = 0; x < SIZE; x++) {
      const cell = document.createElement('td');
      cell.dataset.x = x;
      cell.dataset.y = y;

      if (board[y][x]) {
        const stone = document.createElement('div');
        stone.className = board[y][x];
        cell.appendChild(stone);
      }

      cell.addEventListener('click', handleClick);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function handleClick(e) {
  const x = parseInt(e.currentTarget.dataset.x);
  const y = parseInt(e.currentTarget.dataset.y);

  if (board[y][x] !== null || !canPlace(x, y, currentPlayer)) return;

  placeStone(x, y, currentPlayer);
  currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
  document.getElementById('turn').textContent = currentPlayer === 'black' ? '黒' : '白';
  renderBoard();
}

function placeStone(x, y, color) {
  board[y][x] = color;
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0],
    [1, 1], [-1, -1], [1, -1], [-1, 1]
  ];

  for (let [dx, dy] of directions) {
    const stones = [];
    let cx = x + dx, cy = y + dy;

    while (cx >= 0 && cx < SIZE && cy >= 0 && cy < SIZE) {
      if (board[cy][cx] === null) break;
      if (board[cy][cx] === color) {
        for (let [fx, fy] of stones) {
          board[fy][fx] = color;
        }
        break;
      }
      stones.push([cx, cy]);
      cx += dx;
      cy += dy;
    }
  }
}

function canPlace(x, y, color) {
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0],
    [1, 1], [-1, -1], [1, -1], [-1, 1]
  ];

  for (let [dx, dy] of directions) {
    let cx = x + dx, cy = y + dy;
    let foundOpponent = false;

    while (cx >= 0 && cx < SIZE && cy >= 0 && cy < SIZE) {
      if (board[cy][cx] === null) break;
      if (board[cy][cx] === color) return foundOpponent;
      foundOpponent = true;
      cx += dx;
      cy += dy;
    }
  }
  return false;
}

renderBoard();