import * as GameMod from "./game.js";
import * as UIMod from "./userInterface.js";
import * as AIMod from "./computerAi.js";
import * as GameObjectMod from "./gameObjects.js";

// testing
UIMod.Initialize();
var game = new GameMod.Game(10);
game.Initialize();

let btn = document.querySelector("#button1");
btn.addEventListener("click", game.NextTurn.bind(game));

let btn2 = document.querySelector("#button2");
btn2.addEventListener("click", game.WhoTurn.bind(game));

// var board = new GameObjectMod.Board(10);
// board.Render();
