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
		this.EnemyShips = gameObjModule.Ship.generateShips(GameTurn.Player);
		this.AllyShips = gameObjModule.Ship.generateShips(GameTurn.Computer);
		this.turn = GameTurn.Player;
		this.board = new gameObjModule.Board(this.board_size);
		this.gameAI = new AIModule.GameAI(this.board);
		this.timeDelay = 500;
	}

	Initialize() {
		this.board.Render();
		this.AddListeners();
		this.NewGame();
	}

	getListOfAllyCells() {
		let result = [];
		this.board.board.forEach((row) => {
			row.forEach((cell) => {
				if (cell.hasShip && cell.team === GameTurn.Player) {
					result.push(cell);
				}
			});
		});
		return result;
	}

	getListOfEnemyCells() {
		let result = [];
		this.board.board.forEach((row) => {
			row.forEach((cell) => {
				if (cell.hasShip && cell.team === GameTurn.Computer) {
					result.push(cell);
				}
			});
		});

		return result;
	}

	NewGame() {
		this.ResetGame();
		this.turn = GameTurn.Player;
		this.PlaceAllShips();
		this.AllyShipCells = this.getListOfAllyCells();
		this.EnemyShipCells = this.getListOfEnemyCells();
	}

	ResetGame() {
		this.board.ResetBoard();
		this.gameState = GameState.Play;
		UIModule.score_HTML.textContent = "";
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
		let node = this;
		this.board.board.forEach((row) => {
			row.forEach((cell) => {
				let cellHTMl = UIModule.getCellFromCoord(cell.y, cell.x);
				// cellHTMl.addEventListener("click", this.PlayerMove.bind(this));
				cellHTMl.addEventListener("click", function () {
					setTimeout(
						function (event) {
							node.PlayerMove(event);
						}.bind(node),
						node.timeDelay,
						event
					);
				});
			});
		});
	}

	PlayerMove(event) {
		if (this.gameState != GameState.Play) {
			return;
		}

		if (this.turn === GameTurn.Computer) {
		} else {
			if (this.board.isValidMove(event.target.id, this.turn)) {
				this.board.Fire(event.target.id);

				if (this.isWin()) {
					this.GameOver();
					return;
				}

				this.NextTurn();
				this.ComputerMove();
			}
		}
	}

	ComputerMove() {
		if (this.gameState != GameState.Play) {
			return;
		}

		let target = this.gameAI.generateMove(this.turn);
		let targetStr = "cell-" + target[0] + target[1];
		let node = this;
		setTimeout(
			() => {
				node.board.Fire(targetStr);
			},
			node.timeDelay * 2,
			targetStr
		);

		if (this.isWin()) {
			this.GameOver();
			return;
		}
		// this.board.Fire(targetStr);
		this.NextTurn();
	}

	NextTurn() {
		if (this.turn === GameTurn.Computer) {
			this.turn = GameTurn.Player;
		} else {
			this.turn = GameTurn.Computer;
		}
	}

	isWin() {
		let result = true;
		let ShipCells;
		if (this.turn === GameTurn.Player) {
			ShipCells = this.AllyShipCells;
		} else {
			ShipCells = this.EnemyShipCells;
		}

		ShipCells.forEach((cell) => {
			if (cell.cellState != gameObjModule.BoardCell.CellState.hit) {
				result = false;
			}
		});

		return result;
	}

	GameOver() {
		this.gameState = GameState.GameOver;

		let winnerMessage;
		if (this.turn === GameTurn.Player) {
			winnerMessage = "You have won the battle!";
		} else {
			winnerMessage = "The enemy has won the battle!";
		}

		UIModule.score_HTML.textContent = winnerMessage;
	}
}

export const GameState = {
	GameOver: Symbol("GameOver"),
	Play: Symbol("Play"),
};

export const GameTurn = {
	Player: Symbol("Player"),
	Computer: Symbol("Computer"),
};
