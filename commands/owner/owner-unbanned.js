export let on = {
	tags: ['unbanned', 'unban'],
	command: ['unbanned', 'unban'],
	owner: true,
	on: async (m, {
		text,
		addBanned
	}) => {
		if (!text) return m.reply(`Masukkan Nomornya. Contoh: .unbanned nomor\nContoh: .unbanned 62xxxxx`);
		let usernya = `${text}@s.whatsapp.net`
		await addBanned(usernya, false);
		m.reply(`Nomor ${usernya} berhasil dihapus dari database banned\nSekarang Nomor Itu Bisa Menggunakan Bot Ini`);
	}
};