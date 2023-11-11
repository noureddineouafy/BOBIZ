import { addToko } from '../../lib/database.js'
export let on = {
	
	tags: ['addtoko', 'addlist'],
	command: ['addtoko'],
	owner: true,
	on: async (m, {
		text,
		prefix,
		command
	}) => {
		if (!text) return m.reply(`Masukkan dagangan ke toko.\ncontoh ${prefix + command} nama toko item\n\nContoh pemakaian:\n${prefix + command} toko1(spasi)item1 atau textnya  \n${prefix + command} toko2 itemnya atau listnya \n\nDaftar List store atau toko aku adalah\n1. diamon ml\n2. diamon ff\ndan seterusnya contoh \n.addtoko toko1spasi text nya sepanjang panjangnya juga bisa`);
		let [toko, ...items] = text.split(" ");
		if (!items.length)
			return m.reply(`Masukkan item yang ingin ditambahkan ke ${toko}.`);
		let item = items.join(" ");
		await addToko(toko, item);
		m.reply(`Berhasil memasukkan ${item} ke ${toko}`);
	}
};