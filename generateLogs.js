import {player1, player2} from "./players.js";
import {getRandom} from "./utility.js";
import {logs} from "./logs.js";

export {chat, generateLogs, };

const chat = document.querySelector('.chat');

function generateLogs(type, {name} = {}, { name: playerName2, hp } = {}, hitValue) {
	let pattern = '';
	let text = '';
	let time = new Date().toISOString().slice(11, 16);
	switch (type) {
		case 'start':
			pattern = logs['start'][getRandom(logs['start'].length-1)].replace('[time]', `${time}`).replace('[player1]', (name)).replace('[player2]', (playerName2));
			text = `<p>${pattern}</p>`;
			break
		case 'hit':
			pattern = logs['hit'][getRandom(logs['hit'].length-1)].replace('[playerKick]', (name)).replace('[playerDefence]', (playerName2));
			text = `<p>${time} – ${pattern} <span style="color: #ff0000;">-${hitValue}</span> [${hp}/100]</p>`;
			break
		case 'defence':
			pattern = logs['defence'][getRandom(logs['defence'].length-1)].replace('[playerKick]', (playerName2)).replace('[playerDefence]', (name));
			text = `<p>${time} – ${pattern}</p>`;
			break
		case 'end':
			pattern = logs['end'][getRandom(logs['end'].length-1)].replace('[playerWins]', (playerName2)).replace('[playerLose]', (name));
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
