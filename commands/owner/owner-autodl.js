import { autoDownload } from "../../lib/database.js";
export let on = {
	names: ['Owner'],
	tags: ['autodownload'],
	command: ['autodownload', 'autodl'],
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
				auto_dl: true
			};
			m.reply(`auto download berhasil diaktifkan`);
		} else if (text.toLowerCase() === "off") {
			change = {
				auto_dl: false
			};
			m.reply(`auto download berhasil dimatikan `);
		} else {
			return m.reply(`Masukkan Parameter yang valid on/off`);
		}
		autoDownload(change);
	}
};