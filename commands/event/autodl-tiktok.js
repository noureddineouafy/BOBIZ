import fetch from 'node-fetch'
export let event = {
	on: async (m, {
		conn,
		budy,
		Limit,
		autodl,
		mess,
		checkLimitUser
	}) => {
		let tR = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
		if (autodl && tR.test(budy)) {
			if (checkLimitUser(m.sender) <= 0) {
				return m.reply(mess.limit);
			}
			let tiktokLinks = budy.match(tR)
			for (let tiktokLink of tiktokLinks) {
				let res = await fetch('https://vihangayt.me/download/tiktok2?url=' + tiktokLink)
				m.react('🕒', m.chat)
				let data = await res.json()
				let title = data.data.title
				let caption = data.data.caption
				let video = data.data.nowm
				let txt = `🎗 *TIKTOK* \n`
				txt += `⭔ Judul : ${title}\n`
				txt += `⭔ Caption : ${caption}`
				conn.sendFile(m.chat, video, {
					caption: txt,
					quoted: m
				})
				Limit(m.sender, 3);
			}
		}
	}
};