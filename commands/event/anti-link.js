export let event = {
	on: async (m, {
		conn,
		group,
		sleep,
		budy,
		isAdmins,
		isOwner
	}) => {
		if (group && group.antilink && !m.fromMe && !m.isBaileys) {
			if (budy.includes('https://chat.whatsapp.com/')) {
				if (isAdmins) return m.reply('You are admin free to send link');
				if (isOwner) return m.reply('You are my owner bot also free to send link');
				let sent = m.sender;
				conn.sendMessage(
					m.chat, {
						text: `@${sent.split("@")[0]} Terdeteksi Mengirim Kata Kata Aneh!`,
						contextInfo: {
							mentionedJid: [sent]
						}
					}, {
						quoted: m
					}
				);
				await sleep(3000)
				await conn.groupParticipantsUpdate(m.chat, [sent], 'remove')
			}
		}
	}
};