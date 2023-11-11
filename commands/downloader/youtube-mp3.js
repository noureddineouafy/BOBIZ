import { ytmp3 } from '../../lib/download.js'
export let on = {
	names: ['Downloader'],
	tags: ['ytmp3'],
	command: ['ytmp3', 'yta'],
	on: async (m, {
		conn,
		text,
		mess,
		prefix,
		command
	}) => {
		if (!text) return m.reply(`تحميل مقاطع اليوتوب على شكل موسيقى! \nمثال: \n${prefix + command} https://www.youtube.com/watch?v=nvVLUYFUbxM&t=0`);
		m.reply(mess.wait)
		let {
			audio,
			title
		} = await ytmp3(text)
		conn.sendMessage(m.chat, {
			document: {
				url: audio
			},
			mimetype: 'audio/mpeg',
			fileName: `${title}.mp3`
		}, {
			quoted: m
		})
	}
};