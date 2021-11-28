export async function pickPlayers() {
	const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json())
	return body;
}

export async function getRandomEnemy() {
	const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json())
	return body
}

export async function startFight() {
	const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
		method: 'POST',
		body: JSON.stringify({
			hit,
			defence,
		})
	})
	return body
}