import * as GameMod from "./game.js";
import * as UIMod from "./userInterface.js";
import * as AIMod from "./computerAi.js";
import * as GameObjectMod from "./gameObjects.js";

// testing
UIMod.Initialize();
var game = new GameMod.Game(10);
game.Initialize();

// var board = new GameObjectMod.Board(10);
// board.Render();
