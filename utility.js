export {getRandom, createElement, createReloadButton, changeHP, elHP, renderHP, attack};

const getRandom = (num) => Math.ceil(Math.random() * num);

function createElement(tag,className){
	const $tag = document.createElement(tag);
	$tag.className = className;
	return $tag;
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

function changeHP(amount){
	this.hp -= amount;

	if (this.hp <= 0) {
		this.hp = 0;
	}
}

function elHP() {
	return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
	this.elHP().style.width = this.hp + '%';
}

function attack() {
	console.log(this.name + ', Fight...');
}