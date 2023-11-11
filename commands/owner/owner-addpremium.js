export let on = {
	tags: ['addpremium', 'addprem'],
	command: ['addpremium', 'addprem'],
	owner: true,
	on: async (m, {
		text,
		addPremium,
		dbPlus
	}) => {
		if (!text) return m.reply(`Masukkan Nomornya. Contoh: .addprem nomor\nContoh: .addprem 62xxxxx`);
		let usernya = `${text}@s.whatsapp.net`
		await addPremium(usernya, true);
		await dbPlus(usernya, { limit : 1000 })
		m.reply(`Nomor ${usernya} menjadi premium`);
	}
};