// HTML tags for UI updates in modules
export const gameBoard_HTML = document.querySelector("#gameBoard");
export const score_HTML = document.querySelector("#scoreDisplay");
export const playerArea_HTML = document.querySelector("#playerArea");
export const enemyArea_HTML = document.querySelector("#enemyArea");
export const NewGame_HTML = document.querySelector("#buttonNewGame");
export const Surrender_HTML = document.querySelector("#buttonSurrender");

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

const colorSchemeC = ["#61312e", "#f6dd86", "#241b21", "#e9e6c0"];

const colorSchemeD = ["#22223B", "#4A4E69", "#9A8C98", "#C9ADA7", "#F2E9E4"];

export const colorScheme = colorSchemeA;

export function Initialize() {
	SetColors();
}

function SetColors() {
	let i = 0;

	colorScheme.forEach((color) => {
		let name = "--color" + i++;
		document.querySelector(":root").style.setProperty(name, color);
	});
}
