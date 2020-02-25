const appContainer = document.getElementById("app");
const scoreDiv = document.getElementById("score");
let pacmanPosition = {
  "x": 1,
  "y": 1
}
const blockWidth = 40;
let score = 0;

// This code will create the following HTML is the resulting web page:
//    <div class="pacman"> </div>
const pacman = document.createElement("img");
pacman.src = "images/pacman.gif";
pacman.className = "pacman";

// now we will set the position of the pacman image on the page
pacman.style.left = (pacmanPosition["x"] * blockWidth) + "px";
pacman.style.top = (pacmanPosition["y"] * blockWidth) + "px";

// add the pacman to the web page
appContainer.append(pacman);

// create a new div for the world that Pacman will run around in
const worldMap = document.createElement("div");
appContainer.append(worldMap);

let world = [
  [2,2,2,2,2,2,2,2,2,2],
  [2,0,1,1,1,1,1,1,1,2],
  [2,1,1,2,2,2,2,1,1,2],
  [2,1,1,2,1,1,1,1,1,2],
  [2,1,1,2,2,3,2,2,1,2],
  [2,1,1,1,1,1,1,2,1,2],
  [2,1,1,1,1,2,2,2,1,2],
  [2,1,1,1,1,1,1,1,1,2],
  [2,2,2,2,2,2,2,2,2,2]
];

let worldHeight = world.length;
let worldWidth = world[0].length;
let blockType = {
  0: "empty",
  1: "coin",
  2: "brick",
  3: "cherry"
}

scoreDiv.style.left = (worldWidth * blockWidth + 40) + "px";
scoreDiv.style.top = "20px";
scoreDiv.innerHTML = score;

// using the double array above, create the HTML to draw the world that pacman will go through
function drawWorld() {
  let output = "";
  for (var i = 0 ; i < world.length ; i++) {
    output += "<div class='row'>";
    for (var j = 0 ; j < world[i].length ; j++) {
      output += "<div class='" + blockType[world[i][j]] + "'></div>"
    }
    output += "</div>";
  }
  worldMap.innerHTML = output;
}
drawWorld();

// When a directional arrow is pressed, adjust pacman and the world accordingly
function onKeyDown(event) {
  let xPos = pacmanPosition["x"];
  let yPos = pacmanPosition["y"];

  // Keycode 37 = arrow left   a == 65
  if (event["keyCode"] === 37) {
    pacman.style.transform = "rotate(180deg)";

    if (world[yPos][xPos - 1] != 2) {
      xPos -=1
      console.log("going left - new position:" + pacman.style.left);
    } else {
      console.log("Cannot go left - position is:" + pacman.style.left);
    }
  }
  
  // Keycode 38 = arrow up     w == 87
  else if (event["keyCode"] === 38) {
    pacman.style.transform = "rotate(270deg)";

    if (world[yPos - 1][xPos] != 2) {
      yPos -= 1;
      console.log("going up - new position:" + pacman.style.top);
    } else {
      console.log("Cannot go Up - position is:" + pacman.style.top);
    }
  }

  // Keycode 39 = arrow right  d == 68
  else if (event["keyCode"] === 39) {
    pacman.style.transform = "rotate(0deg)";
    
    if (world[yPos][xPos + 1] != 2) {
      xPos +=1
      console.log("going right - new position:" + pacman.style.left);
    } else {
      console.log("Cannot go right - position is:" + pacman.style.left);
    }
  }

  // Keycode 40 = arrow down   s == 83
  else if (event["keyCode"] === 40) {
    pacman.style.transform = "rotate(90deg)";

    if (world[yPos + 1][xPos] != 2) {
      yPos += 1;
      console.log("going down - new position:" + pacman.style.top);
    } else {
      console.log("Cannot go Down - position is:" + pacman.style.top);
    }
  }

  pacmanPosition["y"] = yPos;
  pacman.style.top = (yPos * blockWidth) + "px";
  pacmanPosition["x"] = xPos;
  pacman.style.left = (xPos * blockWidth) + "px";
  console.log("xPos: " + xPos + "   yPos: " + yPos);

  // ONLY update the score and the board to have the correct layout as pacman eats the coins
  let newBlockType = world[yPos][xPos];
  if (newBlockType == 1 || newBlockType > 2) {
    world[yPos][xPos] = 0;
    if (newBlockType == 1) {
      score += 10;
    }
    else {
      score += 50;
    }
    drawWorld();
    scoreDiv.innerHTML = "Score: " + score;
  }

}

// run the function "onKeyDown" when a key is pressed
document.addEventListener("keydown", onKeyDown);
