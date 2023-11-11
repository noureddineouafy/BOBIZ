import fetch from 'node-fetch'
export let on = {
	names: ['Anime Menu'],
	tags: ['yuki'],
	command: ['yuki'],
	on: async (m, {
		conn,
		mess
	}) => {
		let res = await fetch('https://drive.google.com/uc?id=1-V3d-yrPHT_3qNTewqL5dxunLQjT4Wqs&export=download')
		let data = await res.json()
		m.reply(mess.wait)
		let yuki = data[Math.floor(Math.random() * data.length)]
		conn.sendMessage(m.chat, {
			image: {
				url: yuki
			},
			caption: `🎗 *Yuki*\ninstagram.com/noureddine_ouafy `
		}, {
			quoted: m
		})
	}
};