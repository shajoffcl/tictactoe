let turn = 0;
let d = document.getElementById("dimension");
let dimension = 3;
let gameBoard = [];
let gameOver = false;
const reset = document.getElementById("reset");
for (let i = 3; i <= 10; i++) {
  let el = document.createElement("option");
  el.value = i;
  el.id = i;
  el.textContent = i;
  d.appendChild(el);
}

const startGame = () => {
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");
  let message = document.getElementById("message");
  let player1 = input1.value;
  let player2 = input2.value;
  dimension = parseInt(d.selectedOptions[0].value);
  if (isEmpty(player1) || isEmpty(player2)) {
    alert("Player name is required");
    return;
  }

  input1.setAttribute("disabled", true);
  input2.setAttribute("disabled", true);

  let game = document.getElementById("game-container");
  game.classList.remove("hide");
  d.setAttribute("disabled", true);

  gameBoard = new Array(dimension)
    .fill("")
    .map(() => new Array(dimension).fill(""));
  createTable();
  document.getElementById("game-start").setAttribute("disabled", true);
  console.log(gameBoard);
  message.innerHTML = `${player1}'s turn`;
};

const handleclick = (cell, i, j) => {
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");

  let player1 = input1.value;
  let player2 = input2.value;
  console.log(`${i} ${j}`);
  let el = cell;

  let message = document.getElementById("message");

  if (el.innerHTML !== "" || gameOver) {
    return;
  }
  if (turn % 2 === 0) {
    el.innerHTML = "X";
    gameBoard[i][j] = 1;
    turn++;
    message.innerHTML = `${player2}'s turn`;
  } else {
    el.innerHTML = "O";
    gameBoard[i][j] = 2;
    turn++;
    message.innerHTML = `${player1}'s turn`;
  }

  if (checkWin()) {
    console.log(gameBoard);
    console.log("here");
    if ((turn - 1) % 2 === 0) {
      message.innerHTML = player1 + " won!!!";
      gameOver = true;
    } else {
      message.innerHTML = player2 + " won!!!";
      gameOver = true;
    }
    reset.classList.remove("hide");
    return;
  } else if (draw()) {
    console.log("herw");
    message.innerHTML = "match draw.";
    gameOver = true;
    reset.classList.remove("hide");
    return;
  }
};

const draw = () => {
  if (turn === dimension * dimension) {
    return true;
  }
};
const checkWin = () => {
  // console.log(turn);
  if (turn < dimension) {
    return false;
  }
  let temp = [];
  for (let i = 0; i < dimension; i++) {
    temp = [];
    for (let j = 0; j < dimension; j++) {
      temp.push(gameBoard[i][j]);
    }
    if (checkTemp(temp)) {
      return true;
    }
  }

  for (let i = 0; i < dimension; i++) {
    temp = [];
    for (let j = 0; j < dimension; j++) {
      temp.push(gameBoard[j][i]);
      console.log(temp);
    }
    if (checkTemp(temp)) {
      return true;
    }
  }
  temp = [];
  //checking diagonals
  for (let i = 0; i < dimension; i++) {
    temp.push(gameBoard[i][i]);
  }
  if (checkTemp(temp)) {
    return true;
  }
  temp = [];
  for (let i = dimension - 1; i >= 0; i--) {
    temp.push(gameBoard[dimension - i - 1][i]);
  }
  if (checkTemp(temp)) {
    return true;
  }
  return false;
};

const checkTemp = (temp) => {
  console.log(temp);
  for (let i = 0; i < dimension - 1; i++) {
    if (temp[i] === "") {
      return false;
    }
    if (temp[i] !== temp[i + 1]) {
      return false;
    }
  }
  return true;
};

const createTable = () => {
  let board = document.getElementById("game-container");
  for (let i = 0; i < dimension; i++) {
    let row = document.createElement("div");

    for (let j = 0; j < dimension; j++) {
      let cell = document.createElement("div");
      cell.addEventListener("click", (event) => handleclick(cell, i, j));
      cell.className = "cell";
      row.appendChild(cell);
    }
    row.className = "row1";
    board.appendChild(row);
  }
};

const r = (event) => {
  reset.classList.add("hide");
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");
  input1.removeAttribute("disabled");
  input2.removeAttribute("disabled");
  document.getElementById("game-start").removeAttribute("disabled");
  d.removeAttribute("disabled", false);
  let container = document.getElementById("game-container");
  removeAllChildNodes(container);
  container.classList.add("hide");
  input1.value = "";
  input2.value = "";
  document.getElementById("message").innerHTML = "";
  turn = 0;
  gameOver = false;
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

reset.addEventListener("click", r);

const isEmpty = (value) => !value || !value.trim();
