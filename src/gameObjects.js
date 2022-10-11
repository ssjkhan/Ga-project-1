import * as UIModule from "./userInterface.js";
import * as gameModule from "./game.js";

/*
    Represents a 
*/

export class Board {
	constructor(n) {
		this.length = n;
		this.board = new Array(n).fill(0).map(() => {
			return new Array(n - 1).fill(0);
		});

		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				this.board[i][j] = new BoardCell(i, j);
				if (i === Math.floor(n / 2)) {
					this.board[i][j].isScrim = true;
					this.board[i][j].scrimPos = 0;
				}
				if (i === Math.ceil(n / 2) - 1) {
					this.board[i][j].isScrim = true;
					this.board[i][j].scrimPos = 1;
				}
			}
		}
	}

	Render() {
		let grid_template_Areas = "";

		for (let i = 0; i < this.length; i++) {
			let grid_template_row = "";

			for (let j = 0; j < this.length; j++) {
				this.board[i][j].Render();
				grid_template_row += " " + this.board[i][j].getGridCoords();
			}

			grid_template_Areas += '"' + grid_template_row + '"';
			if (i + 2 != length) {
				grid_template_Areas += " \n";
			}
		}

		UIModule.gameBoard_HTML.style.gridTemplateAreas = grid_template_Areas;
	}

	Fire(cell_id) {}

	PlaceShip(ship, gameTurn) {
		let start = this.NextPlacement(ship, gameTurn);
		let player = gameTurn === gameModule.GameTurn.Player ? "Player" : "Computer";
		console.log(player + "\tStartPos\t" + start + "\tShip\t" + ship.id);
		for (let i = 0; i < ship.length; i++) {
			let y = start[0];
			let x = start[1] + i;
			this.board[y][x].hasShip = true;

			let cell = UIModule.getCellFromCoord(y, x);
			cell.classList.add("hasShip");
		}
	}

	NextPlacement(ship, gameTurn) {
		let position = this.NextRandomPlacement(ship);

		if (gameTurn === gameModule.GameTurn.Player) {
			if (position[0] < 5) {
				position[0] += 5;
			}
		} else {
			if (position[0] > 4) {
				position[0] -= 5;
			}
		}

		return position;
	}

	NextRandomPlacement(ship) {
		let yMin = 5;
		let yLimit = 5;

		let y_random = Math.floor(Math.random() * this.length);
		let x_random = Math.floor(Math.random() * this.length);

		return this.NextValidPlacement(ship, y_random, x_random);
	}

	NextValidPlacement(ship, yStart, xStart) {
		let len = ship.length;

		for (let x = xStart; x < this.length; x++) {
			// console.log("Checking x,y\t" + y_start + x);
			let isValid = this.isValidPlacement(len, yStart, x);
			// console.log(isValid);
			if (isValid) {
				return [yStart, x];
			}
		}

		for (let y = yStart + 1; y < this.length; y++) {
			for (let x = 0; x < this.length; x++) {
				if (this.isValidPlacement(len, y, x)) return [y, x];
			}
		}

		return this.NextValidPlacement(ship, 0, 0);
	}

	isValidPlacement(len, yStart, xStart) {
		let counter = len;
		// console.log("hasShip\t" + this.board[y_start][x_start].hasShip);
		for (let i = 0; i < this.length - xStart - 1; i++) {
			let isFree = !this.board[yStart][xStart + i].hasShip;
			if (isFree) counter--;
			else {
				return false;
			}
			if (counter === 0) return true;
		}

		return false;
	}
}

class BoardCell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.hasShip = false;
		this.cellVisibility = BoardCell.CellVisibilityStates.default;
	}

	static CellVisibilityStates = {
		default: Symbol("default"),
		miss: Symbol("miss"),
		hit: Symbol("hit"),
	};

	Render() {
		let cell = document.createElement("div");

		cell.classList.add("cell");
		if (this.isScrim) {
			if (this.scrimPos == 0) cell.classList.add("scrimmage-top");
			if (this.scrimPos == 1) cell.classList.add("scrimmage-bottom");
		}

		cell.setAttribute("id", this.getGridCoords());

		cell.style.gridArea = this.getGridCoords();

		UIModule.gameBoard_HTML.append(cell);
	}

	getGridCoords() {
		let gridCoords = "cell-" + this.x + this.y;
		return gridCoords;
	}
}

export class Ship {
	constructor(n) {
		this.length = n;
		this.id = n;
	}

	static generateShips() {
		let shipsArr = Array.from({ length: 4 }, (_, i) => new Ship(i + 1));

		return shipsArr;
	}
}
