import { getDB } from "../../lib/database.js";
export let on = {
	tags: ['database'],
	command: ['db', 'database', 'getdb'],
	owner: true,
	on: async (m, {
		conn,
		sleep
	}) => {
		let {
			data,
			name,
			mime
		} = await getDB()
		m.reply(`Tunggu sedang mengambil file database...`)
		await sleep(3500) //this depending on your user if too many users i think 5000 is okay
		conn.sendMessage(m.chat, {
			document: {
				url: data
			},
			caption: 'Berhasil Backup database',
			mimetype: mime,
			fileName: name
		}, {
			quoted: m
		})
	}
};