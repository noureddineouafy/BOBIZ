import { mediafireDl } from '../../lib/scrape_Mediafire.js'
export let on = {
	names: ['Downloader'],
	tags: ['mediafire'],
	command: ['mediafire', 'mf'],
	limit: 20,
	on: async (m, {
		conn,
		text,
		mess,
		prefix,
		command
	}) => {
		if (!text) return m.reply(`Contoh:\n${prefix+command} https://www.mediafire.com/file/96mscj81p92na3r/images+(35).jpeg/file`)
		let isLinks = text.match(/(?:https?:\/{2})?(?:w{3}\.)?mediafire(?:com)?\.(?:com|be)(?:\/www\?v=|\/)([^\s&]+)/)
		if (!isLinks) return m.reply('Link yang kamu berikan tidak valid')
		let emfi1 = await mediafireDl(`${isLinks}`)
		m.reply(mess.wait)
		if (emfi1[0].size.split('MB')[0] >= 128) return m.reply('File Melebihi Batas Dari 128MB\n\n' + JSON.stringify(emfi1, null, 2))
		let txt = ` *MEDIAFIRE*\n\n`
		txt += ` ${java} Nama : ${emfi1[0].nama}\n`
		txt += ` ${java} Size : ${emfi1[0].size}\n`
		txt += ` ${java} Type : ${emfi1[0].mime}\n\n`
		txt += ` Mengirim file...`
		m.reply(txt)
		conn.sendMessage(m.chat, {
			document: {
				url: emfi1[0].link
			},
			fileName: emfi1[0].nama,
			mimetype: emfi1[0].mime
		}, {
			quoted: m
		})
	}
};