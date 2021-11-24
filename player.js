export class Player {
	constructor(props) {
		this.player = props.player;
		this.name = props.name;
		this.hp = props.hp;
		this.img = props.img;
		this.weapon = props.weapon;
	}

	changeHP = (amount) => {
		this.hp -= amount;

		if (this.hp <= 0) {
			this.hp = 0;
		}
	}

	elHP = () => {
		return document.querySelector(`.player${this.player} .life`);
	}

	renderHP = () => {
		this.elHP().style.width = this.hp + '%';
	}
}

export const player1 = new Player({
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'https://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['Spear', 'Fire'],
});

export const player2 = new Player({
	player: 2,
	name: 'Sub-Zero',
	hp: 100,
	img: 'https://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Shuriken', 'Ice'],
});