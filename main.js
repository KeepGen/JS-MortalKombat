const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');
const chat = document.querySelector('.chat');
const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: [
		 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
		 '[player1] и [player2] бросили вызов друг другу, когда на курантах было [time]',
		 'Суровые [player1] и [player2] договорились о дуэли ровно в [time]. Оба пунктуальны.',
		 'Который сейчас час? Ах да... [time]! Самое время для дуэли! Встречайте [player1] и [player2]!',
		 '[player1] вызвал на дуэль [player2], чтобы выяснить, кто из них самый крутой боец! Оба бойца пришли ровно в [time]',
    ],
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
        '[playerLose] оказался не готов к бою... [playerWins] заслужено победил!',
        '[playerWins] сделал котлету из [playerLose]. Какая жалось...',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничтожества, никто так и не победил!! АХАХА!!!'
};

const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'https://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['Spear', 'Fire'],
	changeHP,
	elHP,
	renderHP,
	attack,
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
	attack,
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

function attack() {
	console.log(this.name + ', Fight...');
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

	return attack;
}

function showResult(){
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