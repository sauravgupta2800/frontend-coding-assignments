/****************************** */
/*         Handler IDs
/****************************** */
const currentGrid = document.getElementById("currentGrid");
const targetGrid = document.getElementById("targetGrid");
const gridSize = document.getElementById("size");
const stepCount = document.getElementById("stepCount");
const equate = document.getElementById("equate");
const quit = document.getElementById("quit");

/****************************** */
/*         GAME STATE
/****************************** */
let gameState = {
  grid: null,
  counter: 0,
};

// FIRST RENDER using IIFE
(function () {
  setTimeout(() => {
    gameState.grid = new Grid(4); // default size 4
    gameState.grid.init();
  }, 200);
})();

/****************************** */
/*         EVENT LISTENERS
/****************************** */

// Handling the grid cell click
currentGrid.addEventListener("click", (event) => {
  const { x, y } = event.target.dataset;
  gameState.grid.handleToggleCurrentGrid(x, y);
  stepCount.innerHTML = parseInt(stepCount.innerHTML) + 1;
});

// Handling the Grid size change
gridSize.addEventListener("click", (e) => {
  const size = parseInt(e.target.value);
  gameState.grid = new Grid(size);
  gameState.grid.init();
});

/****************************** */
/*     GRID CLASS & METHODS
/****************************** */

function Grid(size) {
  this.size = size;
  // CONSTRUCTOR
  this.init = function () {
    let arrTarget = [...Array(this.size)].map(() => Array(this.size).fill(0));
    // Generating Random 0 and 1
    this.arrayTarget = helper.generateRandom0or1([...arrTarget]);

    // currentGrid with Random toggle
    this.arrayCurr = helper.generateRandomCurrent([...this.arrayTarget]);
    // Render it
    this.renderGrid(targetGrid, this.arrayTarget);
    this.renderGrid(currentGrid, this.arrayCurr);
    //Reset
    stepCount.innerHTML = "0";
    if (helper.isCurrentAndTargetSame(this.arrayCurr, this.arrayTarget)) {
      // CURRENT_GRID === TARGET_GRID
      equate.innerHTML = "===";
      quit.innerHTML = "Game Over";
      quit.classList.add("finished");
      currentGrid.classList.remove("pointer-click");
    } else {
      // CURRENT_GRID !== TARGET_GRID
      equate.innerHTML = "!==";
      quit.innerHTML = "Playing Mode";
      quit.classList.remove("finished");
      currentGrid.classList.add("pointer-click");
    }
  };
  // RENDER GRID
  this.renderGrid = function (docId, renderArray) {
    const size = renderArray.length;
    let row = "";
    for (let i = 0; i < size; i++) {
      row += '<div class="row">';
      for (let j = 0; j < size; j++) {
        row += `<div class="column ${
          renderArray[i][j] ? "one" : ""
        }" data-x='${i}' data-y="${j}">${renderArray[i][j]}</div>`;
      }
      row += "</div>";
    }
    docId.innerHTML = row;
  };
  // HANLDE TOGGLE OF ROW,COLUMN
  this.handleToggleCurrentGrid = function (x, y) {
    this.arrayCurr = helper.toggleRowsAndColumn(this.arrayCurr, x, y);
    this.renderGrid(currentGrid, this.arrayCurr);

    if (helper.isCurrentAndTargetSame(this.arrayCurr, this.arrayTarget)) {
      equate.innerHTML = "===";
      quit.innerHTML = "Game Over";
      quit.classList.add("finished");
      currentGrid.classList.remove("pointer-click");
    } else {
      equate.innerHTML = "!==";
      quit.innerHTML = "Playing Mode";
      quit.classList.remove("finished");
      currentGrid.classList.add("pointer-click");
    }
  };
}

/****************************** */
/*     HELPER METHODS
/****************************** */

const helper = {
  generateRandom0or1: function (arr) {
    const size = arr.length;
    let array = this.deepCopy(arr);
    for (let i = 0; i < 5; i++) {
      let randomXIdx = Math.round(Math.random() * (size - 1));
      let randomYIdx = Math.round(Math.random() * (size - 1));
      array[randomXIdx][randomYIdx] = 1;
    }
    return array;
  },
  toggleRowsAndColumn: function (arr, x, y) {
    const size = arr.length;
    let array = this.deepCopy(arr);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i == x || j == y) {
          array[i][j] = array[i][j] === 1 ? 0 : 1;
        }
      }
    }
    return array;
  },
  generateRandomCurrent: function (arr) {
    const size = arr.length;
    let array = this.deepCopy(arr);
    for (let i = 0; i < 2; i++) {
      let randomXIdx = Math.round(Math.random() * (size - 1));
      let randomYIdx = Math.round(Math.random() * (size - 1));
      array = this.toggleRowsAndColumn(array, randomXIdx, randomYIdx);
    }
    return array;
  },
  deepCopy: function (arr) {
    let copy = [];
    arr.forEach((elem) => {
      if (Array.isArray(elem)) {
        copy.push(this.deepCopy(elem));
      } else {
        if (typeof elem === "object") {
          copy.push(this.deepCopyObject(elem));
        } else {
          copy.push(elem);
        }
      }
    });
    return copy;
  },
  deepCopyObject: function (obj) {
    let tempObj = {};
    for (let [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        tempObj[key] = this.deepCopy(value);
      } else {
        if (typeof value === "object") {
          tempObj[key] = this.deepCopyObject(value);
        } else {
          tempObj[key] = value;
        }
      }
    }
    return tempObj;
  },
  isCurrentAndTargetSame: function (curr, target) {
    let size = curr.length;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (curr[i][j] !== target[i][j]) {
          return false;
        }
      }
    }
    return true;
  },
};
