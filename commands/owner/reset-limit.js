export let on = {
	tags: ['resetlimit'],
	command: ['resetlimit'],
	owner: true,
	on: async (m, {
		conn,
		text,
		resetLimits
	}) => {
		if (!text) m.reply(`Masukan Nilai Limit Yang Ingin Di Reset Ke Semua Pengguna\ncontoh .resetlimit 25`);
		await resetLimits(text);
		let a = `Berhasil Mereset Limit\n${text} Per User`;
		await conn.sendMessage(m.chat, {
			text: a
		}, {
			quoted: m
		});
	}
};