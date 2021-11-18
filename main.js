const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');
const formFight = document.querySelector('.control');
const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'https://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['Spear', 'Fire'],

	changeHP,
	elHP,
	renderHP,

	attack: function() {
		console.log(this.name + ' Fight...');
	}
}

const player2 = {
	player: 2,
	name: 'Sub-Zero',
	hp: 100,
	img: 'https://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Shuriken', 'Ice'],

	changeHP,
	elHP,
	renderHP,

	//attack: function() {
		//console.log(this.name + ' Fight...');
	//}
}

function createElement(tag,className){
	const $tag = document.createElement(tag);
	$tag.className = className;
	return $tag;
}

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

function changeHP(amount){
	this.hp -= amount;

	if (this.hp <= 0) {
		this.hp = 0;
	}
}

function elHP() {
	return document.querySelector('.player' + this.player +' .life');
}

function renderHP() {
	this.elHP().style.width = this.hp + '%';
}

function createReloadButton() {
	const reloadWrap = createElement('div', 'reloadWrap');
	const reloadButton = createElement('button', 'button');
	reloadButton.innerHTML = 'Restart';
	reloadWrap.appendChild(reloadButton);
	reloadButton.addEventListener('click', () => {
		window.location.reload();
	})
	return reloadWrap
}

function getRandom(num){
	return Math.ceil(Math.random() * num);
}

function playerWins(name){
	const loseTitle = createElement('div', 'loseTitle');
	if (name) {
		loseTitle.innerHTML = name + ' wins';
	} else {
		loseTitle.innerHTML = 'draw';
	}
	return loseTitle;
}

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

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

	return attack
}

formFight.addEventListener('submit', function(e) {
	e.preventDefault();

	const enemy = enemyAttack();
	const attack = playerAttack();

	console.log(attack);
	console.log(player1.name + ' hits ' + player2.name + "'s " + attack.hit + ' and causes ' + attack.value + ' damage!');
	console.log(enemy);
	console.log(player2.name + ' hits ' + player1.name + "'s " + enemy.hit + ' and causes ' + enemy.value + ' damage!');

	if (enemy.hit !== attack.defence) {
		player1.changeHP(enemy.value);
		player1.renderHP();
	}
	if (attack.hit !== enemy.defence) {
		player2.changeHP(attack.value);
		player2.renderHP();
	}

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
});