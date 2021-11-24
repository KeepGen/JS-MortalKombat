import {player1, player2} from "./players.js";
import {createElement, createReloadButton} from "./utility.js";
import {arenas, formFight} from "./main.js";
import {generateLogs} from "./generateLogs.js";

export {playerWins, showResult};

function playerWins(name){
	const loseTitle = createElement('div', 'loseTitle');
	if (name) {
		loseTitle.innerHTML = name + ' wins';
	} else {
		loseTitle.innerHTML = 'draw';
	}
	return loseTitle;
}

function showResult(){
	if (player1.hp === 0 || player2.hp === 0) {
		formFight.style.display = 'none';
		arenas.appendChild(createReloadButton());
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		arenas.appendChild(playerWins(player2.name));
		generateLogs('end', player1, player2);
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		arenas.appendChild(playerWins(player1.name));
		generateLogs('end', player2, player1);
	} else if (player1.hp === 0 && player2.hp === 0) {
		arenas.appendChild(playerWins());
		generateLogs('draw');
	}
}