import {Player} from './player.js';
import {logs} from "./logs.js";

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

export class Game {
	constructor(props) {
		this.arenas = document.querySelector('.arenas');
		this.formFight = document.querySelector('.control');
		this.chat = document.querySelector('.chat');

		this.player1 = new Player({
			player: 1,
			name: 'Scorpion',
			hp: 100,
			img: 'https://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
			weapon: ['Spear', 'Fire'],
		});

		this.player2 = new Player({
			player: 2,
			name: 'Sub-Zero',
			hp: 100,
			img: 'https://reactmarathon-api.herokuapp.com/assets/subzero.gif',
			weapon: ['Shuriken', 'Ice'],
		});
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
			window.location.reload();
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

	generateLogs = (type, {name} = {}, { name: playerName2, hp } = {}, hitValue) => {
		let pattern = '';
		let text = '';
		let date = new Date();
		let time = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(11, 16);
		switch (type) {
			case 'start':
				pattern = logs['start'][this.getRandom(logs['start'].length-1)].replace('[time]', `${time}`)
					.replace('[player1]', (name).toUpperCase())
					.replace('[player2]', (playerName2).toUpperCase());
				text = `<p>${pattern}</p>`;
				break
			case 'hit':
				pattern = logs['hit'][this.getRandom(logs['hit'].length-1)]
					.replace('[playerKick]', (name).toUpperCase())
					.replace('[playerDefence]', (playerName2).toUpperCase());
				text = `<p>${time} – ${pattern} <span style="color: #ff8383;">-${hitValue}</span> [${hp}/100]</p>`;
				break
			case 'defence':
				pattern = logs['defence'][this.getRandom(logs['defence'].length-1)]
					.replace('[playerKick]', (playerName2).toUpperCase())
					.replace('[playerDefence]', (name).toUpperCase());
				text = `<p>${time} – ${pattern}</p>`;
				break
			case 'end':
				pattern = logs['end'][this.getRandom(logs['end'].length-1)]
					.replace('[playerWins]', (playerName2).toUpperCase())
					.replace('[playerLose]', (name).toUpperCase());
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

	playerWins= (name) => {
		const loseTitle = this.createElement('div', 'loseTitle');
		if (name) {
			loseTitle.innerHTML = name + ' wins';
		} else {
			loseTitle.innerHTML = 'draw';
		}
		return loseTitle;
	}

	showResult = () => {
		if (this.player1.hp === 0 || this.player2.hp === 0) {
			this.formFight.style.display = 'none';
			this.arenas.appendChild(this.createReloadButton());
		}

		if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
			this.arenas.appendChild(this.playerWins(this.player2.name));
			this.generateLogs('end', this.player1, this.player2);
		} else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
			this.arenas.appendChild(this.playerWins(this.player1.name));
			this.generateLogs('end', this.player2, this.player1);
		} else if (this.player1.hp === 0 && this.player2.hp === 0) {
			this.arenas.appendChild(this.playerWins());
			this.generateLogs('draw');
		}
	}

	start = () => {
		this.arenas.appendChild(this.createPlayer(this.player1));
		this.arenas.appendChild(this.createPlayer(this.player2));
		this.generateLogs('start', this.player1, this.player2);

		this.formFight.addEventListener('submit', (e) => {
			e.preventDefault();

			const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = this.enemyAttack();
			const {hit, defence, value} = this.playerAttack();

			if (hitEnemy !== defence) {
				this.player1.changeHP(valueEnemy);
				this.player1.renderHP();
				this.generateLogs('hit', this.player2, this.player1, valueEnemy);
			} else {
				this.generateLogs('defence', this.player2, this.player1);
			}

			if (hit !== defenceEnemy) {
				this.player2.changeHP(value);
				this.player2.renderHP();
				this.generateLogs('hit', this.player1, this.player2, value);
			} else {
				this.generateLogs('defence', this.player1, this.player2);
			}

			this.showResult();
		});
	}

}