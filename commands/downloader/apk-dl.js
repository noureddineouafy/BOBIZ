import fetch from 'node-fetch';
import { createRequire } from 'module';
let require = createRequire(import.meta.url);
let { download } = require('apk-dl')
export let on = {
	names: ['Downloader'],
	tags: ['apk', 'apkdl'],
	command: ['apk', 'apkdl'],
	on: async (m, {
		conn,
		text
	}) => {
		if (!text) return m.reply('*مثال:*\n\n*.apk* lite');
		if (m.isBaileys) return
		let res = await download(text)
		m.reply('جاري تلبية طلبكم تابع نورالدين في حسابه \ninstagram.com/noureddine_ouafy')
		let icon = await res.icon
		let paket = await res.package
		let size = await res.size
		let teks = `*APK DOWNLOAD*\n`
		teks += ` ${java} ${paket}\n`
		teks += ` ${java} ${size}\n\n`
		teks += ` ${java} *جاري إرسال الملف...*`
		conn.sendFile(m.chat, icon, {
			caption: teks,
			quoted: m
		})
		let nama = await res.name
		let up = await res.lastup
		let file = await res.dllink
		let txt = `*APK DOWNLOAD*\n`
		txt += ` ${java} الاسم : ${nama}\n`
		txt += ` ${java} التحذيث : ${up}\n`
		txt += ` ${java} الباكيدج : ${paket}\n`
		txt += ` ${java} الحجم : ${size}`
		conn.sendMessage(m.chat, {
			document: {
				url: file
			},
			caption: txt,
			fileName: nama + '.apk',
			mimetype: 'application/vnd.android.package-archive'
		}, {
			quoted: m
		})
	}
};