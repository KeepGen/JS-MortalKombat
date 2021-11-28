import {pickPlayers} from './api.js';
import {Player} from './player.js';
import {logs} from "./logs.js";

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const allArenas = ['arena1', 'arena2', 'arena3', 'arena4', 'arena5'];

export class Game {
	constructor() {
		this.arenas = document.querySelector('.arenas');
		this.formFight = document.querySelector('.control');
		this.chat = document.querySelector('.chat');
	}

	createElement = (tag,className) => {
		const $tag = document.createElement(tag);
		if (className) {
			$tag.classList.add(className);
		}
		return $tag;
	}

	createPlayer = ({player, hp, name, img}) => {
		const $player = this.createElement('div',`player${player}`);
		const $progressbar = this.createElement('div','progressbar');
		const $character = this.createElement('div','character');
		const $life = this.createElement('div','life');
		const $name = this.createElement('div','name');
		const $img = this.createElement('img');

		$life.style.width = hp + '%';
		$name.textContent = name;
		$img.src = img;

		$player.appendChild($progressbar);
		$player.appendChild($character);
		$progressbar.appendChild($life);
		$progressbar.appendChild($name);
		$character.appendChild($img);

		return $player;
	}

	createReloadButton = () => {
		const reloadWrap = this.createElement('div', 'reloadWrap');
		const reloadButton = this.createElement('button', 'button');
		reloadButton.innerHTML = 'Restart';
		reloadWrap.appendChild(reloadButton);
		reloadButton.addEventListener('click', () => {
			//window.location.reload();
			window.location.pathname = 'JS-MortalKombat/index.html'
		})
		return reloadWrap
	}

	getRandom = (num) => Math.ceil(Math.random() * num);

	enemyAttack = () => {
		const hit = ATTACK[this.getRandom(3) - 1];
		const defence = ATTACK[this.getRandom(3) - 1];
		return {
			value: this.getRandom(HIT[hit]),
			hit,
			defence,
		}
	}

	playerAttack = () => {
		const attack = {};

		for(let item of this.formFight) {
			if (item.checked && item.name === 'hit') {
				attack.value = this.getRandom((HIT)[item.value]);
				attack.hit = item.value;
			}
			if (item.checked && item.name === 'defence') {
				attack.defence = item.value;
			}
			item.checked = false;
		}

		return attack;
	}

	generateLogs = (type, {name: playerName1} = {}, { name: playerName2, hp } = {}, hitValue) => {
		let pattern = '';
		let text = '';
		let date = new Date();
		let time = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(11, 16);
		switch (type) {
			case 'start':
				pattern = logs['start'][this.getRandom(logs['start'].length-1)].replace('[time]', `${time}`)
					.replace('[player1]', (playerName1).toUpperCase())
					.replace('[player2]', (playerName2).toUpperCase());
				text = `<p>${pattern}</p>`;
				break
			case 'hit':
				pattern = logs['hit'][this.getRandom(logs['hit'].length-1)]
					.replace('[playerKick]', (playerName1).toUpperCase())
					.replace('[playerDefence]', (playerName2).toUpperCase());
				text = `<p>${time} – ${pattern} <span style="color: #ff8383;">-${hitValue}</span> [${hp}/100]</p>`;
				break
			case 'defence':
				pattern = logs['defence'][this.getRandom(logs['defence'].length-1)]
					.replace('[playerKick]', (playerName2).toUpperCase())
					.replace('[playerDefence]', (playerName1).toUpperCase());
				text = `<p>${time} – ${pattern}</p>`;
				break
			case 'end':
				pattern = logs['end'][this.getRandom(logs['end'].length-1)]
					.replace('[playerWins]', (playerName2).toUpperCase())
					.replace('[playerLose]', (playerName1).toUpperCase());
				text = `<p>${pattern}</p>`;
				break
			case 'draw':
				pattern = logs['draw'];
				text = `<p>${pattern}</p>`;
			default:
				break
		}
		this.chat.insertAdjacentHTML('afterbegin', text);
	}

	playerWins = (name) => {
		const loseTitle = this.createElement('div', 'loseTitle');
		if (name) {
			loseTitle.innerHTML = name + ' wins';
		} else {
			loseTitle.innerHTML = 'draw';
		}
		return loseTitle;
	}

	showResult = (player1, player2) => {
		const { name: name1, hp: hp1 } = player1;
		const { name: name2, hp: hp2 } = player2;

		if (hp1 === 0 || hp2 === 0) {
			this.formFight.style.display = 'none';
			this.arenas.appendChild(this.createReloadButton());
		}

		if (hp1 === 0 && hp1 < hp2) {
			this.arenas.appendChild(this.playerWins(name2));
			this.generateLogs('end', player1, player2);
		} else if (hp2 === 0 && hp2 < hp1) {
			this.arenas.appendChild(this.playerWins(name1));
			this.generateLogs('end', player2, player1);
		} else if (hp1 === 0 && hp2 === 0) {
			this.arenas.appendChild(this.playerWins());
			this.generateLogs('draw');
		}

		console.log(player1);
		console.log(player2);
	}

	start = async () => {
		this.arenas.classList.add(allArenas[this.getRandom(allArenas.length) - 1]);

		const players = await pickPlayers();
		const p1 = JSON.parse(localStorage.getItem('player1'));
		const p2 = players[this.getRandom(players.length) - 1];

		const player1 = new Player ({
			...p1,
			player: 1,
			rootSelector: 'arenas',
		})
		console.log(player1);

		const player2 = new Player ({
			...p2,
			player: 2,
			rootSelector: 'arenas',
		})
		console.log(player2);

		this.arenas.appendChild(this.createPlayer(player1));
		this.arenas.appendChild(this.createPlayer(player2));
		this.generateLogs('start', player1, player2);

		this.formFight.addEventListener('submit', (e) => {
			e.preventDefault();

			const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = this.enemyAttack();
			const {hit: hitPlayer, defence: defencePlayer, value: valuePlayer} = this.playerAttack();

			if (hitEnemy !== defencePlayer) {
				player1.changeHP(valueEnemy);
				player1.renderHP();
				this.generateLogs('hit', player2, player1, valueEnemy);
			} else {
				this.generateLogs('defence', player2, player1);
			}

			if (hitPlayer !== defenceEnemy) {
				player2.changeHP(valuePlayer);
				player2.renderHP();
				this.generateLogs('hit', player1, player2, valuePlayer);
			} else {
				this.generateLogs('defence', player1, player2);
			}

			this.showResult(player1, player2);
		});
	}

}