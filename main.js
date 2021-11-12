const arenas = document.querySelector('.arenas');

const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'https://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['Spear', 'Fire'],
	attack: function() {
		console.log(player1.name + ' Fight...');
	}
}

const player2 = {
	player: 2,
	name: 'Sub-Zero',
	hp: 100,
	img: 'https://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Shuriken', 'Ice'],
	attack: function() {
		console.log(player2.name + ' Fight...');
	}
}

function createPlayer(playerNumber, playerName, healthPoints) {
	const player = document.createElement('div');
	const progressBar = document.createElement('div');
	const character = document.createElement('div');
	const life = document.createElement('div');
	const name = document.createElement('div');
	const img = document.createElement('img');

	player.appendChild(progressBar);
	player.appendChild(character);
	progressBar.appendChild(life);
	progressBar.appendChild(name);
	character.appendChild(img);

	player.classList.add('player'+playerNumber.player); // playerNumber
	progressBar.classList.add('progressbar');
	character.classList.add('character');
	life.classList.add('life');
	name.classList.add('name');

	img.src = playerNumber.img;
	life.style.width = healthPoints + '%';
	name.innerText = playerName;

	return player;
}

arenas.appendChild(createPlayer(player1, 'Scorpion', 50));
arenas.appendChild(createPlayer(player2, 'Sub-Zero', 80));
