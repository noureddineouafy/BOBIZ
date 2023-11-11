import { ttdl } from '../../lib/download.js';
export let on = {
	names: ['Downloader'],
	tags: ['ttmp3'],
	command: ['ttmp3', 'tiktokmp3'],
	limit: 3,
	on: async (m, {
		conn,
		text,
		mess,
		prefix,
		command
	}) => {
		if (!text) return m.reply(`Masukan link tiktok nya! \nContoh: ${prefix + command} https://vt.tiktok.com/ZSNYfYdLj`);
		m.reply(mess.wait);
		let { audio	} = await ttdl(text);
		conn.sendFile(m.chat, audio, {
			mimetype: 'audioMessage',
			ptt: true,
			quoted: m
		});
	}
};