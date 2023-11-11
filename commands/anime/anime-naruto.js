import fetch from 'node-fetch'
export let on = {
	names: ['Anime Menu'],
	tags: ['naruto'],
	command: ['naruto'],
	register: false,
	on: async (m, {
		conn,
		mess
	}) => {
		let res = await fetch('https://drive.google.com/uc?id=1-XX8xG9_4rWIo3j7zTB3KWlDz4gknTlS&export=download')
		let data = await res.json()
		m.reply(mess.wait)
		let naruto = data[Math.floor(Math.random() * data.length)]
		conn.sendMessage(m.chat, {
			image: {
				url: naruto
			},
			caption: `🎗 *Naruto*\ninstagram.com/noureddine_ouafy `
		}, {
			quoted: m
		})
	}
};