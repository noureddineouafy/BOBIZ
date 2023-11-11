import { changeSelf } from "../../lib/database.js";
export let on = {
	tags: ['self'],
	command: ['self'],
	owner: true,
	on: async (m, {
		conn,
		text,
		prefix,
		command
	}) => {
		if (!text) return m.reply(`Masukkan Parameternya contoh ${prefix+command} on/off`);
		let change;
		if (text.toLowerCase() === "on") {
			change = {
				self: true
			};
			m.reply(`Mode self berhasil diaktifkan. Hanya aku, owner, dan premium yang dapat mengakses bot ini`);
		} else if (text.toLowerCase() === "off") {
			change = {
				self: false
			};
			m.reply(`Mode self berhasil dimatikan. Sekarang semua orang dapat mengakses bot ini`);
		} else {
			return m.reply(`Masukkan Parameter yang valid: on/off`);
		}
		changeSelf(change);
	}
};