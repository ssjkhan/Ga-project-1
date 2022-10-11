import * as GameMod from "./game.js";
import * as UIMod from "./userInterface.js";
import * as AIMod from "./computerAi.js";
import * as GameObjectMod from "./gameObjects.js";

// testing
UIMod.Initialize();
var game = new GameMod.Game(10);
game.Initialize();
console.log(game.AllyShipCells);

function CheckWin() {
	console.log(game.isWin());
}

let btn = document.querySelector("#button1");
btn.addEventListener("click", CheckWin);

let btn2 = document.querySelector("#button2");
btn2.addEventListener("click", game.NewGame.bind(game));

// var board = new GameObjectMod.Board(10);
// board.Render();
