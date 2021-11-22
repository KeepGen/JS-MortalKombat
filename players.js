import {changeHP, elHP, renderHP, attack} from "./utility.js";

export {player1, player2};

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