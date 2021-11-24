const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');

import {createElement} from './utility.js';
import {player1, player2} from './players.js';
import {generateLogs} from './generateLogs.js';
import {enemyAttack, playerAttack} from './battleFunctions.js';
import {showResult} from './afterBattle.js';

export {arenas, formFight, createPlayer};

function createPlayer({ player, hp, name, img }){
	const $player = createElement('div',`player${player}`);
	const $progressbar = createElement('div','progressbar');
	const $character = createElement('div','character');
	const $life = createElement('div','life');
	const $img = createElement('img');
	const $name = createElement('div','name');

	$life.style.width = hp + '%';
	$name.textContent = name;
	$img.src = img;

	$player.appendChild($progressbar);
	$player.appendChild($character);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img)
	return $player
}

formFight.addEventListener('submit', function(e) {
	e.preventDefault();

	const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = enemyAttack();
	const {hit, defence, value} = playerAttack();

	if (hitEnemy !== defence) {
		player1.changeHP(valueEnemy);
		player1.renderHP();
		generateLogs('hit', player2, player1, valueEnemy);
	} else {
		generateLogs('defence', player2, player1);
	}

	if (hit !== defenceEnemy) {
		player2.changeHP(value);
		player2.renderHP();
		generateLogs('hit', player1, player2, value);
	} else {
		generateLogs('defence', player1, player2);
	}

	showResult();
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));