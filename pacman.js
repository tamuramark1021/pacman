const appContainer = $("#app");
let scoreDiv = $("#score");

const blockWidth = 40;
let score = 0;

// create a new div for the world that Pacman will run around in
const worldMap = document.createElement("div");
appContainer.append(worldMap);

let world = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,2,2,3,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var worldHeight = world.length;
var worldWidth = world[0].length;
let blockType = {
  0: "empty",
  1: "coin",
  2: "brick",
  3: "cherry"
}

const pacmanObj = {
  "image": "images/pacman.gif",
  // TODO: A feature would be to make this dynamic - let the user choose this by adding a URL to a gif or select some premade images
  // TODO: "lives": 3,  This needs to be added to the game object

  "position": {
    "x": 1,
    "y": 1
  },

  "createPacman": function() {
    let pacman = document.createElement("img");

    // This code will create the following HTML is the resulting web page:
    //    <img src="..." class="pacman"> </div>
    pacman.src = this.image; 
    pacman.className = "pacman";
    pacman.id = "hero";

    pacman["style"]["top"] = `${pacmanObj["position"]["y"] * blockWidth}px`;
    pacman["style"]["left"] = `${pacmanObj["position"]["x"] * blockWidth}px`;

    return pacman;
  },

  // This doesn't appear to work and so we can get rid of this
  //    instead, use jquery to grab the object as we need it
  // "hero": $("#hero"),

  "move": function(XorY, num, rotate) {
    this["position"][XorY] += num;
    // string concatination to replace the "rotate(" + rotate + "deg)"
    // this.hero.style.transform is the same as the following syntax
    // console.log("transform: " + `rotate(${rotate}deg)`);
    // console.log("top:       " + `${pacmanObj["position"]["y"] * blockWidth}px`);
    // console.log("left:      " + `${pacmanObj["position"]["x"] * blockWidth}px`);

    // using a jquery function called css we can use an object with key value pairs to set css properties
    //     https://api.jquery.com/css/#css-properties
    $("#hero").css({
      "transform": `rotate(${rotate}deg)`,
      "top": `${pacmanObj["position"]["y"] * blockWidth}px`,
      "left": `${pacmanObj["position"]["x"] * blockWidth}px`
    });
    // failed attempts
    // this["hero"].css({
    // this["hero"]["css"]("top", `${pacmanObj["position"]["y"] * blockWidth}px`);
    // this["hero"]["css"]("left", `${pacmanObj["position"]["x"] * blockWidth}px`);

    // ONLY update the score and the board to have the correct layout as pacman eats the coins
    let newBlockType = world[pacmanObj["position"]["y"]][pacmanObj["position"]["x"]];
    if (newBlockType == 1 || newBlockType > 2) {
      // console.log ("new block type: " + newBlockType);
      world[pacmanObj["position"]["y"]][pacmanObj["position"]["x"]] = 0;
      if (newBlockType == 1) {
        score += 10;
      }
      else {
        score += 50;
      }
      drawWorld();
      scoreDiv.html("Score: " + score);
    }

    console.log(`Hero will move to: ${XorY}:${this.position[XorY] * blockWidth}`);
  }
}

// console.log("create pacman: " + pacmanObj.createPacman);
appContainer.append(pacmanObj["createPacman"]());

scoreDiv.css({
  "top": "20px",
  "left": (worldWidth * blockWidth + 40) + "px"
});
// you can do this with 2 different commands or use the object as shown above
// scoreDiv.css("top", "20px");
// scoreDiv.css("left", (worldWidth * blockWidth + 40) + "px");
scoreDiv.html(score);


// using the double array from above, create the HTML to draw the world that pacman will go through
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
  let xPos = pacmanObj["position"]["x"];
  let yPos = pacmanObj["position"]["y"];

  // Keycode 37 = arrow left   a == 65
  if (event["keyCode"] === 37) {
    if (world[yPos][xPos - 1] != 2) pacmanObj["move"]("x", -1, 180);
  }
  
  // Keycode 38 = arrow up     w == 87
  else if (event["keyCode"] === 38) {
    if (world[yPos - 1][xPos] != 2) pacmanObj["move"]("y", -1, 270);
  }

  // Keycode 39 = arrow right  d == 68
  else if (event["keyCode"] === 39) {
    if (world[yPos][xPos + 1] != 2) pacmanObj["move"]("x", 1, 0);
  }

  // Keycode 40 = arrow down   s == 83
  else if (event["keyCode"] === 40) {
    if (world[yPos + 1][xPos] != 2) pacmanObj["move"]("y", 1, 90);
  }
}

// run the function "onKeyDown" when a key is pressed
// document.addEventListener("keydown", onKeyDown);
$(document).keydown(onKeyDown);
