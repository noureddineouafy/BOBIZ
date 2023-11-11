export let on = {
	tags: ['removeprem', 'hapusprem'],
	command: ['removeprem', 'hapusprem'],
	owner: true,
	on: async (m, {
		text,
		addPremium
	}) => {
		if (!text) return m.reply(`Masukkan Nomornya. Contoh: .hapusprem nomor\nContoh: .hapusprem 62xxxxx`);
		let usernya = `${text}@s.whatsapp.net`
		await addPremium(usernya, false);
		m.reply(`Nomor ${usernya} tidak lagi menjadi premium`);
	}
};