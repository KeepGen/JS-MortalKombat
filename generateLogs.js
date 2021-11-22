import {player1, player2} from "./players.js";
import {getRandom} from "./utility.js";
import {logs} from "./logs.js";

export {chat, generateLogs, };

const chat = document.querySelector('.chat');

function generateLogs(type, player1, player2, hitValue) {
	let pattern = '';
	let text = '';
	let time = new Date().toISOString().slice(11, 16);
	switch (type) {
		case 'start':
			pattern = logs['start'][getRandom(logs['start'].length-1)].replace('[time]', `${time}`).replace('[player1]', (player1.name)).replace('[player2]', (player2.name));
			text = `<p>${pattern}</p>`;
			break
		case 'hit':
			pattern = logs['hit'][getRandom(logs['hit'].length-1)].replace('[playerKick]', (player1.name)).replace('[playerDefence]', (player2.name));
			text = `<p>${time} – ${pattern} <span style="color: #ff0000;">-${hitValue}</span> [${player2.hp}/100]</p>`;
			break
		case 'defence':
			pattern = logs['defence'][getRandom(logs['defence'].length-1)].replace('[playerKick]', (player2.name)).replace('[playerDefence]', (player1.name));
			text = `<p>${time} – ${pattern}</p>`;
			break
		case 'end':
			pattern = logs['end'][getRandom(logs['end'].length-1)].replace('[playerWins]', (player2.name)).replace('[playerLose]', (player1.name));
			text = `<p>${pattern}</p>`;
			break
		case 'draw':
			pattern = logs['draw'];
			text = `<p>${pattern}</p>`;
		default:
			break
	}
	chat.insertAdjacentHTML('afterbegin', text);
}
generateLogs('start', player1, player2);
