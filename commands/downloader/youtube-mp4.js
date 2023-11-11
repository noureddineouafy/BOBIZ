import { ytmp4 } from '../../lib/download.js'
export let on = {
	names: ['Downloader'],
	tags: ['ytmp4'],
	command: ['ytmp4', 'ytv'],
	on: async (m, {
		conn,
		text,
		mess,
		prefix,
		command
	}) => {
		if (!text) return m.reply(`مثال : \n${prefix+command} https://www.youtube.com/watch?v=nvVLUYFUbxM&t=0`)
		m.reply(mess.wait)
		let {
			title,
			size,
			video,
			quality			
		} = await ytmp4(text)
		let txt = `*YOUTUBE VIDEO*\n`
		txt += ` ⭔  : ${title}\n`
		txt += ` ⭔  : ${quality}\n`
		txt += ` ⭔  : ${size}`
		conn.sendFile(m.chat, video, {
			caption: txt,
			quoted: m
		})
	}
};