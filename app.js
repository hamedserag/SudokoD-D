var gridIndexBox = [
  ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
  ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"],
  ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"],
  ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"],
  ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"],
  ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"],
  ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"],
  ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"],
  ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]
];
var alphaRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
var grid = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];
function intiallizeLevel() {
  // important settlment of grid for re-intiallzation of levels when calling after page load
  grid = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];
  //randomly adds empty spaces for user to add his answers
  //i<48 dificulty
  for (var i = 0; i < 48; i++) {
    var int1 = getRandomIntBet(0, 8);
    var int2 = getRandomIntBet(0, 8);
    if (!grid[int1][int2] == "0") {
      grid[int1][int2] = "0";
    }
  }
  //intialize numbers on grid
  //I x1 -- X x9 -- Z x81
  for (var i = 0; i < 9; i++) {
    for (var x = 0; x < 9; x++) {
      if (grid[i][x] != "0") {
        var elementNum = x + 1;
        document.getElementById(alphaRows[i] + elementNum).value = grid[i][x];
        document.getElementById(alphaRows[i] + elementNum).disabled = true;
        document.getElementById(alphaRows[i] + elementNum).style.backgroundColor = "rgb(80,80,80)";
      }
    }
  }
  textInputColor();
}
function submitLevel() {
  //CHECK IF GRID IS FULL
  hasWon = true;
  gridCompleted = true;
  for (var i = 0; i < 9; i++) {
    for (var x = 0; x < 9; x++) {
      var elementNum = x + 1;
      if (document.getElementById(alphaRows[i] + elementNum).value == "") {
        alert("Please Fill all empty spaces first...");
        //stop checking if found 1 empty
        i = 9;
        x = 9;
        gridCompleted = false;
        break;
      }
    }
  }
  //checks if grid has correct answers
  //z*1 i*9 x*9*9 variable speed>> z alpha i number x number of checking element
  //checks row using for loop (asmaa's algorithm)
  for (var z = 0; z < 9; z++) {
    for (var i = 1; i < 10; i++) {
      for (var x = 1; x < 10; x++) {
        if(document.getElementById(alphaRows[z] + i).value == document.getElementById(alphaRows[z] + x).value)
        {
          alert("DUPLICATE IN ROW")
          hasWon = false;
        }
      }
    }
  }
  //checks col
  for (var z = 1; z < 10; z++) {
    for (var i = 0; i < 9; i++) {
      for (var x = 0; x < 9; x++) {
        if(document.getElementById(alphaRows[i] + z).value == document.getElementById(alphaRows[x] + z).value)
        {
          alert("DUPLICATE IN COL")
          hasWon = false;
        }
      }
    }
  }
  for (var z = 0; z < 9; z++) {
    for (var i = 0; i < 9; i++) {
      for (var x = 0; x < 9; x++) {
        if(document.getElementById(gridIndexBox[z][i]).value == document.getElementById(gridIndexBox[z][x]).value)
        {
          alert("DUPLICATE IN BOX")
          hasWon = false;
        }
      }
    }
  }
  // declare win and lose
  if (hasWon && gridCompleted) {
    //declare winner
    alert("You Won Congratulation ");
    refreshLevel();
  } else if (!hasWon && gridCompleted) {
    //declare loser
    alert("You Lose :( try again");
  }
}
//styling numbers
function textInputColor() {
  //styling the grid
  for (var i = 0; i < 9; i++) {
    for (var x = 0; x < 9; x++) {
      var elementNum = x + 1;
      if (document.getElementById(alphaRows[i] + elementNum).value == "1") {
        var gridElement = document.getElementById(alphaRows[i] + elementNum);
        gridElement.style.color = "rgb(229,85,112)";
      }
      if (document.getElementById(alphaRows[i] + elementNum).value == "2") {
        var gridElement = document.getElementById(alphaRows[i] + elementNum);
        gridElement.style.color = "rgb(215,146,191)";
      }
      if (document.getElementById(alphaRows[i] + elementNum).value == "3") {
        var gridElement = document.getElementById(alphaRows[i] + elementNum);
        gridElement.style.color = "rgb(195,223,172)";
      }
      if (document.getElementById(alphaRows[i] + elementNum).value == "4") {
        var gridElement = document.getElementById(alphaRows[i] + elementNum);
        gridElement.style.color = "rgb(123,203,190)";
      }
      if (document.getElementById(alphaRows[i] + elementNum).value == "5") {
        var gridElement = document.getElementById(alphaRows[i] + elementNum);
        gridElement.style.color = "rgb(248,170,150)";
      }
      if (document.getElementById(alphaRows[i] + elementNum).value == "6") {
        var gridElement = document.getElementById(alphaRows[i] + elementNum);
        gridElement.style.color = "rgb(252,199,155)";
      }
      if (document.getElementById(alphaRows[i] + elementNum).value == "7") {
        var gridElement = document.getElementById(alphaRows[i] + elementNum);
        gridElement.style.color = "rgb(129,210,229)";
      }
      if (document.getElementById(alphaRows[i] + elementNum).value == "8") {
        var gridElement = document.getElementById(alphaRows[i] + elementNum);
        gridElement.style.color = "rgb(111,133,193)";
      }
      if (document.getElementById(alphaRows[i] + elementNum).value == "9") {
        var gridElement = document.getElementById(alphaRows[i] + elementNum);
        gridElement.style.color = "rgb(255,226,146)";
      }
    }
  }
}
