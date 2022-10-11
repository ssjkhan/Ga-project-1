import * as gameMod from "./game.js";
import * as gameObjMod from "./gameObjects.js";

/*
    Handles the AI for random moves
*/

export class GameAI {
	constructor(gameBoard) {
		this.gameBoard = gameBoard;
	}

	generateRandomSquare() {
		let len = this.gameBoard.length;

		let x_random = Math.floor(Math.random() * len);
		let y_random = Math.floor(Math.random() * len);

		return [y_random, x_random];
	}

	generateMove(gameTurn) {
		if ((gameTurn = gameMod.GameTurn.Player)) {
			return this.getValidPlayerTarget();
		} else {
			return this.getValidComputerTarget();
		}
	}

	getValidPlayerTarget() {
		let target = this.getRandPlayerTarget();

		while (
			this.gameBoard.board[target[0]][target[1]].cellState !=
			gameObjMod.BoardCell.CellState.default
		) {
			target = this.getRandPlayerTarget();
		}

		return target;
	}

	getRandPlayerTarget() {
		let target = this.generateRandomSquare();

		if (target[0] < 5) {
			target[0] += 5;
		}

		return target;
	}

	getValidComputerTarget() {
		let target = this.getRandCompTarget();

		while (
			this.gameBoard.board[target[0]][target[1]].cellState !=
			gameObjMod.BoardCell.CellState.default
		) {
			target = this.getRandCompTarget();
		}
		return target;
	}

	getRandCompTarget() {
		let target = this.generateRandomSquare();

		if (target[0] > 4) {
			target[0] -= 5;
		}

		return target;
	}
}
