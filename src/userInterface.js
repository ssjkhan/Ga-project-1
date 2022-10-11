// HTML tags for UI updates in modules
export const gameBoard_HTML = document.querySelector("#gameBoard");
export const playerArea_HTML = document.querySelector("#playerArea");
export const enemyArea_HTML = document.querySelector("#enemyArea");
export const NewGame_HTML = document.querySelector("#buttonNewGame");
export const Surrender_HTML = document.querySelector("#buttonSurrender");
export const display_HTML = document.querySelector("#gameAreaDisplay");

export function getCellFromCoord(y, x) {
	let cell = document.querySelector("#cell-" + y + x);
	return cell;
}

export const EnemySayings = [
	[
		"We're taking on water!",
		"Save the parrot!",
		"It'll take more than that you scallywaggers!",
		"I've seen pea shooters bigger than your cannons!",
		"You'll never take me alive!",
		"Davy Jones, it's time we met",
		"DODGE!",
		"You call this positioning? We're taking free fire!",
		"You'll sink us Lad! Fire back!",
		"Quick, if we stop moving they cant see us!",
	],
	[
		"Sun in their eyes over there.",
		"Quick, now's our chance.",
		"They're blind beggars!",
		"I'll take their gold, but they're giving me their pride.",
		"No pirate would ever call that a shot.",
		"How can they call themselves pirates?",
		"I can shoot better with my left hand!",
		"Their luck's run out!",
		"BOARD THEIR SHIPS.",
		"Are they aiming, or their monkeys?",
	],
];
export const AllySayings = [
	[
		"Good shot there Lad!",
		"They'll be dining with the fishes.",
		"I've got a word for them- DEAD.",
		"The Navy will never take me alive!",
		"Take that you cowards!",
		"I've got more where that came from!",
		"If they surrender, they'll WALK THE PLANK!",
		"No quarter for the bootlickers!",
		"I'll be rich, RICH I TELL YA.",
		"Don't sink their shap Lad, I want a souvenir.",
	],
	[
		"I'll have you hung for treason!",
		"Do you need glasses?",
		"Where was that going?",
		"Sun in your eye there Laddie?",
		"My grandmother shoots better than you.",
		"You've got half a brain!",
		"I'll have you walk the plank if ye miss another one!",
		"Blasted cannons are ruined again aren't they?",
		"Put some more gunpowder into it Lad!",
		"How can we get their treasure, if you KEEP MISSING?",
	],
];

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
