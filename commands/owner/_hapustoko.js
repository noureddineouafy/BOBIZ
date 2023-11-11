import { removeToko } from '../../lib/database.js';
export let on = {
	tags: ['hapustoko'],
	command: ['hapustoko'],
	owner: true,
	on: async (m, {
		text,
		prefix,
		command
	}) => {
		if (!text) {
			return m.reply(`Masukkan nama toko yang ingin dihapus.\nContoh: ${prefix + command} nama toko\n\nDaftar toko yang ada:\n1. toko1\n2. toko2\ndan seterusnya`)
		}
		let toko = text.trim();
		await removeToko(toko);
		m.reply(`Berhasil menghapus dagangan yang ada di ${toko}`);
	}
};