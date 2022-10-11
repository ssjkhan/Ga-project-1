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
		this.turn = GameTurn.Player;

		this.board = new gameObjModule.Board(this.board_size);
		this.gameAI = new AIModule.GameAI(this.board);
		this.timeDelay = 2000;
	}

	myTimeout(func) {
		setTimeout(func, this.timeDelay);
	}

	Initialize() {
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

	ResetGame() {
		this.board.ResetBoard();
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
		} else {
			//check valid move
			if (this.board.isValidMove(event.target.id, this.turn)) {
				this.board.Fire(event.target.id);
				this.NextTurn();
				this.ComputerMove();
			}
		}
	}

	ComputerMove() {
		let target = this.gameAI.generateMove(this.turn);
		let targetStr = "cell-" + target[0] + target[1];
		this.board.Fire(targetStr);
		this.NextTurn();
	}

	NextTurn() {
		if (this.turn === GameTurn.Computer) {
			this.turn = GameTurn.Player;
		} else {
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
