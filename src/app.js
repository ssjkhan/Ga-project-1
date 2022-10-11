import * as GameMod from "./game.js";
import * as UIMod from "./userInterface.js";
import * as AIMod from "./computerAi.js";

/*
    Handles all input/output from browser and communicates it to the game
        - Player moves
        - Display total score
        - Rendering new game/game over screens
*/
const Game = new GameMod.Game(10);
// Update UI to script definitions
// Create game variable, initalize game state
// Create UI, initialize UI state
Initialize();
function Initialize() {
	UIMod.Initialize();
	Game.Initialize();
}
