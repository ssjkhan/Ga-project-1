import * as GameMod from "./game.js";
import * as UIMod from "./userInterface.js";
import * as AIMod from "./computerAi.js";

const Game = new GameMod.Game(10);
Initialize();

function Initialize() {
	UIMod.Initialize();
	Game.Initialize();
}
