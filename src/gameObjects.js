import * as UIModule from "./userInterface.js";
import * as gameModule from "./game.js";

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

	PlaceShip(ship, gameTurn) {
		let start = this.NextPlacement(ship, gameTurn);
		let team = gameTurn === gameModule.GameTurn.Player ? "player" : "computer";

		for (let i = 0; i < ship.length; i++) {
			let y = start[0];
			let x = start[1] + i;
			this.board[y][x].hasShip = true;
			this.board[y][x].team = ship.team;

			let cell = UIModule.getCellFromCoord(y, x);
			cell.classList.add("hasShip");
			cell.dataset.team = team;
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
			let isValid = this.isValidPlacement(len, yStart, x);

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

	isValidMove(cellID, turn) {
		let x = cellID.charAt(6);
		let y = cellID.charAt(5);

		if (turn === gameModule.GameTurn.Player) {
			if (y >= 5) return false;
		} else {
			if (y <= 4) return false;
		}

		if (!this.board[y][x].cellState === BoardCell.CellState.default) {
			return false;
		}

		return true;
	}

	Fire(cellID) {
		let x = cellID.charAt(6);
		let y = cellID.charAt(5);

		let cell = this.board[y][x];
		let cellHTML = UIModule.getCellFromCoord(y, x);

		if (cell.hasShip) {
			this.Hit(cell, cellHTML);
			return true;
		} else {
			this.Miss(cell, cellHTML);
			return false;
		}
	}

	Hit(cell, cellHTML) {
		cell.cellState = BoardCell.CellState.hit;
		cellHTML.classList.add("hit");
		cellHTML.textContent = "X";
	}

	Miss(cell, cellHTML) {
		cell.cellState = BoardCell.CellState.miss;
		cellHTML.classList.add("miss");
		cellHTML.textContent = "O";
	}

	ResetBoard() {
		this.board.forEach((row) => {
			row.forEach((cell) => {
				cell.Reset();

				let cellHTML = UIModule.getCellFromCoord(cell.y, cell.x);

				cellHTML.textContent = "";
				cellHTML.classList.remove("miss");
				cellHTML.classList.remove("hit");
				cellHTML.classList.remove("hasShip");
			});
		});
	}
}

export class BoardCell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.hasShip = false;
		this.cellState = BoardCell.CellState.default;
	}

	static CellState = {
		default: Symbol("default"),
		miss: Symbol("miss"),
		hit: Symbol("hit"),
	};

	Reset() {
		this.hasShip = false;
		this.cellState = BoardCell.CellState.default;
	}

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
	constructor(n, team) {
		this.length = n;
		this.id = n;
		this.team = team;
	}

	static generateShips(team) {
		let shipsArr = [];
		for (let i = 1; i < 5; i++) {
			shipsArr.push(new Ship(i, team));
		}

		return shipsArr;
	}
}
