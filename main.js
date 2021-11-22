const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');

import {createElement} from './utility.js';
import {player1, player2} from './players.js';
import {generateLogs} from './generateLogs.js';
import {enemyAttack, playerAttack} from './battleFunctions.js';
import {showResult} from './afterBattle.js';

export {arenas, formFight, createPlayer};

function createPlayer(playerObj){
	const playerFirst = createElement('div','player'+playerObj.player);
	const progressbar = createElement('div','progressbar');
	const character = createElement('div','character');
	const life = createElement('div','life');
	const img = createElement('img');
	const name = createElement('div','name');

	life.style.width = playerObj.hp + '%';
	name.textContent = playerObj.name;
	img.src = playerObj.img;

	playerFirst.appendChild(progressbar);
	playerFirst.appendChild(character);
	progressbar.appendChild(life);
	progressbar.appendChild(name);
	character.appendChild(img)
	return playerFirst
}

formFight.addEventListener('submit', function(e) {
	e.preventDefault();

	const enemy = enemyAttack();
	const attack = playerAttack();

	if (enemy.hit !== attack.defence) {
		player1.changeHP(enemy.value);
		player1.renderHP();
		generateLogs('hit', player2, player1, enemy.value);
	}
	if (attack.hit !== enemy.defence) {
		player2.changeHP(attack.value);
		player2.renderHP();
		generateLogs('hit', player1, player2, attack.value);
	}

	if (attack.hit === enemy.defence) {
		generateLogs('defence', player2, player1);
	}
	if (enemy.hit === attack.defence) {
		generateLogs('defence', player1, player2);
	}

	if (player1.hp === 0 && player2.hp > 0) {
		generateLogs('end', player1, player2);
	} else if (player1.hp > 0 && player2.hp === 0) {
		generateLogs('end', player1, player2);
	} else if (player1.hp === 0 && player2.hp === 0) {
		generateLogs('draw', player1, player2);
	}

	showResult();
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));