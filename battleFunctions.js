import {getRandom} from "./utility.js";
import {formFight} from "./main.js";

export {HIT, ATTACK, enemyAttack, playerAttack};

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

function enemyAttack() {
	const hit = ATTACK[getRandom(3) - 1];
	const defence = ATTACK[getRandom(3) - 1];
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence,
	}
}

function playerAttack(){
	const attack = {};

	for(let item of formFight) {
		if (item.checked && item.name === 'hit') {
			attack.value = getRandom((HIT)[item.value]);
			attack.hit = item.value;
		}
		if (item.checked && item.name === 'defence') {
			attack.defence = item.value;
		}
		item.checked = false;
	}

	return attack;
}