import * as gameObjModule from "./gameObjects.js";
import * as AIModule from "./computerAi.js";
import * as UIModule from "./userInterface.js";

/*
    Handles all game logic for the application
*/

export class Game {
	constructor(n) {
		this.board_size = n;
		this.gameState = GameState.Battle;
		this.EnemyShips = gameObjModule.Ship.generateShips();
		this.AllyShips = gameObjModule.Ship.generateShips();
		this.turn = GameTurn.Computer;
	}

	Initialize() {
		this.board = new gameObjModule.Board(this.board_size);
		this.board.Render();
		this.AddListeners();
		this.PlaceAllShips();
	}

	NewGame() {
		this.board.ResetBoard();
		this.gameState = GameState.Battle;
		this.turn = GameTurn.Computer;
		this.PlaceAllShips();
	}

	PlaceAllShips() {
		this.AllyShips.forEach((ship) => {
			this.board.PlaceShip(ship, GameTurn.Player);
		});
		this.EnemyShips.forEach((ship) => {
			this.board.PlaceShip(ship, GameTurn.Computer);
		});
	}

	AddListeners() {
		this.board.board.forEach((row) => {
			row.forEach((cell) => {
				let cellHTMl = UIModule.getCellFromCoord(cell.y, cell.x);
				cellHTMl.addEventListener("click", this.PlayerMove.bind(this));
			});
		});
	}

	PlayerMove(event) {
		if (this.turn === GameTurn.Computer) {
			console.log("Wait your turn!");
		} else {
			console.log(event.target.id);
		}
	}

	NextTurn() {
		if (this.turn === GameTurn.Computer) {
			console.log("Computer -> Player");
			this.turn = GameTurn.Player;
		} else {
			console.log("Player -> Computer");
			this.turn = GameTurn.Computer;
		}
	}

	WhoTurn() {
		console.log(this.turn);
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
