//this page has the D&D add on features

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
var gridIndex = [
  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"],
  ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"],
  ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"],
  ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"],
  ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"],
  ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"]
];
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
var shownArea = 0;
var charTypeNum;
var possibility;
//button
function tutorialNext() {
  document.getElementById("tutorial").style.visibility = "hidden";
  document.querySelector(".choiceElement").style.visibility = "visible";
}
//assigning chartype and char stats
var maxStamina;

function chooseCharacter(charTypeNum) {
  switch (charTypeNum) {
    case 1:
      document.getElementById("characterType").innerHTML = "KNIGHT";
      document.getElementById("HP").innerHTML = "150";
      document.getElementById("Stamina").innerHTML = "70";
      maxStamina = 70;
      break;
    case 2:
      document.getElementById("characterType").innerHTML = "MAGE";
      document.getElementById("HP").innerHTML = "70";
      document.getElementById("Stamina").innerHTML = "180";
      maxStamina = 180;
      break;
    case 3:
      document.getElementById("characterType").innerHTML = "FARMER";
      document.getElementById("HP").innerHTML = "100";
      document.getElementById("Stamina").innerHTML = "100";
      maxStamina = 100;
      break;
    case 4:
      document.getElementById("characterType").innerHTML = "CLAIRVOYANCE";
      document.getElementById("HP").innerHTML = "999";
      document.getElementById("Stamina").innerHTML = "999";
      maxStamina = 999;
      break;
    case 5:
      document.getElementById("characterType").innerHTML = "VANILLA";
      break;
    default:

  }
  startLevel();
  document.getElementById("charChoice").innerHTML = "";
}
//first update
function startLevel() {
  updateSight();
}

//moves the area of sight
var direction;

function manageShownArea(direction) {
  //stamina losing function
  var staminaLost = getRandomIntBet(15, 20);
  var stamina = document.getElementById("Stamina").innerHTML;
  stamina -= staminaLost;
  if (stamina <= 0) {
    document.getElementById("Stamina").innerHTML = 0;
    alert("You are out of stamina give yourself some rest warrior")
  } else {
    document.getElementById("Stamina").innerHTML = stamina;
    //hp checker
    var hp = document.getElementById("HP").innerHTML;
    if (hp <= 0) {
      document.getElementById("Hp").innerHTML = 0;
      alert("YOU DIED, you drained all your hp be careful next time warrior");
      refreshLevel();
    }
    if (direction == 1) {
      if (shownArea != 8) {
        shownArea += 1;
      } else {
        shownArea = 0;
      }
    } else if (direction == -1) {
      if (shownArea != 0) {
        shownArea -= 1;
      } else {
        shownArea = 8;
      }
    }
  }
  updateSight();
  possibility = getRandomInt(10);
  //20% chance of an event happening
  console.log("possibility: " + possibility);
  if (possibility == 2 || possibility == 7) {
    eventManager();
  }
}
//updates the line of sight on screen
function updateSight() {
  resetSight();
  if (document.getElementById("characterType").innerHTML == "KNIGHT") {
    for (var i = 0; i < 9; i++) {
      for (var x = 0; x < 9; x++) {
        if (i != shownArea) {
          document.getElementById(gridIndex[i][x]).style.opacity = 0;
        }
      }
    }
  }
  if (document.getElementById("characterType").innerHTML == "MAGE") {
    for (var i = 0; i < 9; i++) {
      for (var x = 0; x < 9; x++) {
        if (i != shownArea) {
          document.getElementById(gridIndex[x][i]).style.opacity = 0;
        }
      }
    }
  }
  if (document.getElementById("characterType").innerHTML == "FARMER") {
    for (var i = 0; i < 9; i++) {
      for (var x = 0; x < 9; x++) {
        if (i != shownArea) {
          document.getElementById(gridIndexBox[i][x]).style.opacity = 0;
        }
      }
    }
  }
  if (document.getElementById("characterType").innerHTML == "CLAIRVOYANCE") {
    document.getElementById("sightNxt").style.visibility = "hidden"
    document.getElementById("sightPrev").innerHTML = "TriggerEvent";
  }
  if (document.getElementById("characterType").innerHTML == "VANILLA") {
    document.getElementById("sightNxt").style.visibility = "hidden";
    document.getElementById("sightPrev").style.visibility = "hidden";
    document.getElementById("currentStats").style.visibility = "hidden";
    document.getElementById("tutorial").style.visibility = "hidden";
  }
}
//reset sight before adjusting
function resetSight() {
  for (var i = 0; i < 9; i++) {
    for (var x = 0; x < 9; x++) {
      document.getElementById(gridIndex[i][x]).style.opacity = 1;
    }
  }
}
//eventManager
var randomEvent;
var events = [];

function eventManager() {
  //random event max is event numbers
  //recursive call to make sure the event doesnt happen twice
  eventHappenOnce();
  console.log("event: " + randomEvent);
  switch (randomEvent) {
    case 1:
      //first event EVIL MAGE SWAPPED TWO ROWS
      //UI
      var dmg = getRandomIntBet(1, 10);
      var hp = document.getElementById("HP").innerHTML;
      hp -= dmg;
      document.getElementById("HP").innerHTML = hp;
      updateGrid();
      //gifManager("https://media.giphy.com/media/8wzDNe9unxCuY/giphy.gif");
      alert("An Evil Mage Appeared and swapped two random rows, that decrease your health by: " + dmg + " Becuase some stone bricks fell on your head");
      //event
      var randomBoxRow = getRandomIntBet(1, 3);
      var index1;
      var index2;
      switch (randomBoxRow) {
        case 1:
          index1 = getRandomIntBet(0, 2);
          index2 = getRandomIntBet(0, 2);
          //to decrease possibilty of swapping same row
          if (index1 == index2) {
            index2 = getRandomIntBet(0, 2);
          }
          swapArrin2dArr(grid, index1, index2);
          break;
        case 2:
          index1 = getRandomIntBet(3, 5);
          index2 = getRandomIntBet(3, 5);
          //to decrease possibilty of swapping same row
          if (index1 == index2) {
            index2 = getRandomIntBet(0, 2);
          }
          swapArrin2dArr(grid, index1, index2);
          break;
        case 3:
          index1 = getRandomIntBet(6, 8);
          index2 = getRandomIntBet(6, 8);
          //to decrease possibilty of swapping same row
          if (index1 == index2) {
            index2 = getRandomIntBet(0, 2);
          }
          swapArrin2dArr(grid, index1, index2);
          break;
        default:
      }
      for (var i = 0; i < 9; i++) {
        if (document.getElementById(gridIndex[index1][i]).disabled == true) {
          document.getElementById(gridIndex[index1][i]).style.backgroundColor = "rgb(46,0,73)";
        } else {
          document.getElementById(gridIndex[index1][i]).style.backgroundColor = "rgb(199,82,255)";
        }
        if (document.getElementById(gridIndex[index1][i]).disabled == true) {
          document.getElementById(gridIndex[index2][i]).style.backgroundColor = "rgb(46,0,73)";
        } else {
          document.getElementById(gridIndex[index2][i]).style.backgroundColor = "rgb(199,82,255)";
        }
      }
      break;
      //██████████████████████████████████ event breaker
    case 2:
      //second event GOBLIN ESCAPED WITH GUIDES
      //ui
      var staminaLost = getRandomIntBet(10, 15);
      var stamina = document.getElementById("Stamina").innerHTML;
      stamina -= staminaLost;
      document.getElementById("Stamina").innerHTML = stamina;
      alert("A Sneaky goblin sneaked into the guide room and stole some guide books the grid has less guide boxes now and you have to fill them up \n You consumed alot of stamina chasing that sneaky goblin\nstamina lost:" + staminaLost);
      //event
      var filledArr = [];
      for (var i = 0; i < 9; i++) {
        for (var x = 0; x < 9; x++) {
          if (document.getElementById(gridIndex[i][x]).disabled == true) {
            filledArr.push(gridIndex[i][x]);
          }
        }
      }
      var numberOfHiddenTiles = getRandomIntBet(1, 3);
      var indexOfHiddenTile;
      for (var i = 0; i < numberOfHiddenTiles; i++) {
        indexOfHiddenTile = getRandomIntBet(0, filledArr.length);
        console.log(indexOfHiddenTile + "<<>>" + filledArr.length);
        document.getElementById(filledArr[indexOfHiddenTile]).disabled = false;
        document.getElementById(filledArr[indexOfHiddenTile]).value = "";
        document.getElementById(filledArr[indexOfHiddenTile]).style.backgroundColor = "rgb(148,27,31)";
        console.log("stolen box Index: " + filledArr[indexOfHiddenTile]);
      }
      break;
    case 3:
      //event three DRAGON DESTROYS ROW
      //ui
      var staminaLost = getRandomIntBet(8, 12);
      var stamina = document.getElementById("Stamina").innerHTML;
      stamina -= staminaLost;
      document.getElementById("Stamina").innerHTML = stamina;
      var dmg = getRandomIntBet(1, 10);
      var hp = document.getElementById("HP").innerHTML;
      hp -= dmg;
      document.getElementById("HP").innerHTML = hp;
      alert("A WILD DRAGON DESTROYED A WHOLE ROW USING ELEMENTAL FIRE BREATH ATTACK YOU BARELY SURVIVED HIS MIGHTY ATTACK IT GREAT DROP IN STATS \nStamina lost: " + staminaLost + "\nHP Lost: " + dmg);
      //event
      var destroyedRow = getRandomInt(8);
      for (var i = 0; i < 9; i++) {
        document.getElementById(gridIndex[destroyedRow][i]).disabled = false;
        document.getElementById(gridIndex[destroyedRow][i]).value = "";
        document.getElementById(gridIndex[destroyedRow][i]).style.backgroundColor = "rgb(255,150,150)";
      }
      break;
      //█████████████████████████████████████████████ positive events
    case 4:
      var colNum = getRandomIntBet(0, 8);
      var displayedColNum = colNum + 1;
      alert("\"so much sorrow.. pain..are you lost ? \"a voice came from the dark \n-you shouted replying- SHOW YOURSELF!!\n you heared a laugh fading into the distance followed by a weird shinning light \nyou saw some ruins falling into place far away a good spirit is on your side it solved a whole column\n col num: " + displayedColNum);
      for (var i = 0; i < 9; i++) {
        if (document.getElementById(gridIndex[i][colNum]).disabled == true) {
          document.getElementById(gridIndex[i][colNum]).style.backgroundColor = "rgb(31,198,0)";
        } else {
          document.getElementById(gridIndex[i][colNum]).style.backgroundColor = "rgb(139,231,139)";
          document.getElementById(gridIndex[i][colNum]).disabled = true;
          document.getElementById(gridIndex[i][colNum]).value = grid[i][colNum];
        }
      }
      break;
    case 5:
      var unfilledArr = [];
      for (var i = 0; i < 9; i++) {
        for (var x = 0; x < 9; x++) {
          if (document.getElementById(gridIndex[i][x]).disabled == false) {
            unfilledArr.push(gridIndex[i][x]);
          }
        }
      }
      var numberOfShownTiles = getRandomIntBet(3, 8);
      var indexOfShownTile;
      alert("you heard a loud scream far away while you sneak closer to the voice the image started to get clear \"what is that?\" -you wandered- \"HELP SOMEONE HELP PLEAAAASE!!%#$#$@\" a simple looking farmer is surronded by goblins you quickly jumped to the rescue slaying all those devilish goblins and saving this poor soul \n the goblins dropped random ruins \"is that magic?\" -the simple man proclaimed- the ruins are fallen pieces from the puzzle they flew to their places right away solving " + numberOfShownTiles + " Ruins");
      //event
      for (var i = 0; i < numberOfShownTiles; i++) {
        var unfilledArrLenCap = unfilledArr.length - 1
        indexOfShownTile = getRandomIntBet(0, unfilledArrLenCap);
        document.getElementById(unfilledArr[indexOfShownTile]).disabled = false;
        document.getElementById(unfilledArr[indexOfShownTile]).value = "PullRequest";
        document.getElementById(unfilledArr[indexOfShownTile]).style.backgroundColor = "rgb(96,175,34)";
        console.log("shown ruins Index: " + unfilledArr[indexOfShownTile]);
      }
      for (var i = 0; i < 9; i++) {
        for (var x = 0; x < 9; x++) {
          if (document.getElementById(gridIndex[i][x]).value == "PullRequest") {
            document.getElementById(gridIndex[i][x]).value = grid[i][x];
          }
        }
      }
      break;
    case 6:
      //YOU FOUND A MAP EVENT
      alert("Suddenly you fill in a hole ... \"ugh that was rough\"-you said- there is no way up only 1 way inside the hole it looks like a maze but not that hard you solved it quickly reaching the treasure room you found the most convinient treasure a puzzle blueprint it will solve some of the puzzle leaving few spaces for our hero");
      //SOLVES 2 ROWS AND 2 COLS
      for (var h = 0; h < 2; h++) {
        var colNum = getRandomIntBet(0, 8);
        for (var i = 0; i < 9; i++) {
          if (document.getElementById(gridIndex[i][colNum]).disabled == true) {
            document.getElementById(gridIndex[i][colNum]).style.backgroundColor = "rgb(247,161,0)";
          } else {
            document.getElementById(gridIndex[i][colNum]).style.backgroundColor = "rgb(255,218,73)";
            document.getElementById(gridIndex[i][colNum]).disabled = true;
            document.getElementById(gridIndex[i][colNum]).value = grid[i][colNum];
          }
        }
        var rowNum = getRandomIntBet(0, 8);
        for (var i = 0; i < 9; i++) {
          if (document.getElementById(gridIndex[rowNum][i]).disabled == true) {
            document.getElementById(gridIndex[rowNum][i]).style.backgroundColor = "rgb(247,161,0)";
          } else {
            document.getElementById(gridIndex[rowNum][i]).style.backgroundColor = "rgb(255,218,73)";
            document.getElementById(gridIndex[rowNum][i]).disabled = true;
            document.getElementById(gridIndex[rowNum][i]).value = grid[i][colNum];
          }
        }
      }
      //SOLVES RANDOM BOXES
      var unfilledArr = [];
      for (var i = 0; i < 9; i++) {
        for (var x = 0; x < 9; x++) {
          if (document.getElementById(gridIndex[i][x]).disabled == false) {
            unfilledArr.push(gridIndex[i][x]);
          }
        }
      }
      var numberOfShownTiles = getRandomIntBet(3, 8);
      var indexOfShownTile;
      for (var i = 0; i < numberOfShownTiles; i++) {
        var unfilledArrLenCap = unfilledArr.length - 1
        indexOfShownTile = getRandomIntBet(0, unfilledArrLenCap);
        document.getElementById(unfilledArr[indexOfShownTile]).disabled = false;
        document.getElementById(unfilledArr[indexOfShownTile]).value = "PullRequest";
        document.getElementById(unfilledArr[indexOfShownTile]).style.backgroundColor = "rgb(255,218,73)";
        console.log("shown ruins Index: " + unfilledArr[indexOfShownTile]);
      }
      for (var i = 0; i < 9; i++) {
        for (var x = 0; x < 9; x++) {
          if (document.getElementById(gridIndex[i][x]).value == "PullRequest") {
            document.getElementById(gridIndex[i][x]).value = grid[i][x];
          }
        }
      }
      break;
    default:
  }
  updateGrid();
}
//████████████████████████████████████████████████████████████████END OF EVENTS
var msgOnce = true;

function eventHappenOnce() {
  if (events.length >= 4) {
    events = [];
  }
  if (document.getElementById("characterType").innerHTML == "CLAIRVOYANCE" && events.length >= 6 && msgOnce) {
    alert("That is all the events you can click new level or reload the page to play with a diffrent character");
    msgOnce = false;
  }
  randomEvent = getRandomInt(6);
  if (events.includes(randomEvent)) {
    eventHappenOnce();
  } else {
    events.push(randomEvent);
  }
}
//redraw the grid
function updateGrid() {
  for (var i = 0; i < 9; i++) {
    for (var x = 0; x < 9; x++) {
      if (document.getElementById(gridIndex[i][x]).disabled == true) {
        document.getElementById(gridIndex[i][x]).value = grid[i][x];
      }
    }
  }
}
//change gif
var imgsrc;

function gifManager(imgsrc) {
  document.getElementById("LeftsideGif").src = imgsrc;
  document.getElementById("RightsideGif").src = imgsrc;
}
//swap 2 arrays
function swapArrin2dArr(twoDArray, arr1Index, arr2Index) {
  var arrTemp = [];
  arrTemp = twoDArray[arr1Index];
  twoDArray[arr1Index] = twoDArray[arr2Index];
  twoDArray[arr2Index] = arrTemp;
  console.log("swapped Rows: " + arr1Index + " and " + arr2Index);
  console.log(grid);
}
//random number generator
function getRandomInt(max) {
  min = 1;
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive added +1 to make maximum inclusive
}
//random number generator in range
function getRandomIntBet(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive +1 to make maximum inclusive
}
//stamina
var timeIntervalforStamina = getRandomIntBet(4000, 9000);
console.log("time for next stamina gain: "+timeIntervalforStamina);
setInterval(function() {
  //this code runs every second
  increaseStamina();
}, timeIntervalforStamina);

function increaseStamina() {
  var stamina = parseInt(document.getElementById("Stamina").innerHTML);
  if (stamina < maxStamina) {
    var staminaGained = getRandomIntBet(8, 11);
    stamina += staminaGained;
    console.log("Stamina updated | stamina gained:" + staminaGained + ", stamina:" + stamina);
    document.getElementById("Stamina").innerHTML = stamina;
  } else {
    console.log("stamina " + stamina);
    console.log("max stamina " + maxStamina);
  }
}
