// HTML tags for UI updates in modules
export const gameBoard_HTML = document.querySelector("#gameBoard");
export const score_HTML = document.querySelector("#scoreDisplay");
export const playerArea_HTML = document.querySelector("#playerArea");
export const enemyArea_HTML = document.querySelector("#enemyArea");

export function getCellFromCoord(y, x) {
	let cell = document.querySelector("#cell-" + y + x);
	return cell;
}

const colorSchemeA = [
	"#22223B",
	"#363852",
	"#4A4E69",
	"#726D81",
	"#9A8C98",
	"#B29DA0",
	"#C9ADA7",
	"#DECBC6",
	"#F2E9E4",
];

const colorSchemeB = [
	"#001219",
	"#005F73",
	"#0A9396",
	"#94D2BD",
	"#E9D8A6",
	"#EE9B00",
	"#CA6702",
	"#BB3E03",
	"#AE2012",
	"#9B2226",
];

export const colorScheme = colorSchemeB;

export function Initialize() {
	SetColors();
}

export function SetColors() {
	let i = 0;

	colorScheme.forEach((color) => {
		let name = "--color" + i++;
		document.querySelector(":root").style.setProperty(name, color);
	});
}
