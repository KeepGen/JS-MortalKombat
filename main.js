const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'https://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['Spear', 'Fire'],

	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP,

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

	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP,

	attack: function() {
		console.log(this.name + ' Fight...');
	}
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

randomButton.addEventListener('click',() => {
	player1.changeHP(getRandom(20));
	player2.changeHP(getRandom(20));
	player1.renderHP();
	player2.renderHP();

	if (player1.hp === 0 || player2.hp === 0){
		randomButton.disabled = true;
		randomButton.style.display = 'none';
		arenas.appendChild(createReloadButton());
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		arenas.appendChild(playerWins(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		arenas.appendChild(playerWins(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		arenas.appendChild(playerWins());
	}
})

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));