export let on = {
	tags: ['pushkontak'],
	command: ['pushkontak', 'pk'],
	owner: true,
	group: true,
	on: async (m, {
		conn,
		text,
		participants
	}) => {
		if (!text) return m.reply('Contoh .pushkontak jembut');
		let users = participants.map(a => a.id);
		let delay = 5000 // 5000 = 5 detik
		m.reply('Hold On Sir Doing Your Command...')
		for (let i = 0; i < users.length; i++) {
			setTimeout(async () => {
				await conn.sendMessage(users[i], {
					text: `${text}`
				}, m);
				if (i === users.length - 1) {
					await m.reply('Pesan sudah dikirim ke semua member');
				}
			}, delay * i);
		}
	}
};