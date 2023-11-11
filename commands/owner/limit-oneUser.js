export let on = {
	tags: ['addlimit', 'tambahlimit'],
	command: ['addlimit', 'tambahlimit'],
	owner: true,
	on: async (m, {
		conn,
		text,
		addLimit
	}) => {
		if (!text) return m.reply("Masukkan nilai limitnya. Contoh: .addlimit nomor limit\nContoh: .addlimit 62xxxxx 25");
		let [number, limit] = text.split(" ");
		let num = number + "@s.whatsapp.net";
		addLimit(num, limit);
		m.reply(`Berhasil Menambahkan ${limit} Limit Ke ${num}`);
	}
};