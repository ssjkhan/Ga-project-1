import * as gameObjModule from "./gameObjects.js";
import * as AIModule from "./computerAi.js";

/*
    Handles all game logic for the application
*/

export class Game {
	constructor(n) {
		this.board_size = n;
		this.gameState = GameState.Battle;
		this.EnemyShips = gameObjModule.Ship.generateShips();
		this.AllyShips = gameObjModule.Ship.generateShips();
	}

	Initialize() {
		this.board = new gameObjModule.Board(this.board_size);
	}

	//TODO
	PlaceAllShips() {
		this.AllyShips.forEach((ship) => {
			this.board.PlaceShip(ship, GameTurn.Player);
		});
		this.EnemyShips.forEach((ship) => {
			this.board.PlaceShip(ship, GameTurn.Computer);
		});
	}
}

export const GameState = {
	GameOver: Symbol("GameOver"),
	Battle: Symbol("Battle"),
};

export const GameTurn = {
	Player: Symbol("Player"),
	Computer: Symbol("Computer"),
};
