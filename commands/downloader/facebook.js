import { fbdl } from '../../lib/download.js';
export let on = {
	names: ['Downloader'],
	tags: ['facebook'],
	command: ['fb', 'facebook', 'fbdl'],
	on: async (m, {
		conn,
		text,
		mess,
		prefix,
		command
	}) => {
		if (!text) return m.reply(`مثال :\n ${prefix + command} https://www.facebook.com/100063533185520/videos/349993840942795`);
		m.reply(mess.wait)
		let {
			video
		} = await fbdl(text)
		conn.sendFile(m.chat, video, {
			caption: `🎗 Facebook\ninstagram.com/noureddine_ouafy`,
			quoted: m
		})
	}
};