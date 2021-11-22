import {player1, player2} from "./players.js";
import {createElement, createReloadButton} from "./utility.js";
import {arenas, formFight} from "./main.js";

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
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		arenas.appendChild(playerWins(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		arenas.appendChild(playerWins());
	}
}
