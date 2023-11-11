import fetch from 'node-fetch'
export let on = {
	names: ['Downloader'],
	tags: ['instagram'],
	command: ['instagram', 'ig', 'igdl'],
	on: async (m, {
		conn,
		text,
		mess,
		prefix,
		command
	}) => {
		if (!text) return m.reply(`مثال:\n ${prefix+command} https://www.instagram.com/reel/CzgO9ZpNBkG/`);
		let res = await fetch('https://vihangayt.me/download/instagram?url=' + text);
		let igeh = await res.json();
		m.reply(mess.wait);
		if (igeh.data && igeh.data.data.length > 0) {
			for (let item of igeh.data.data) {
				await new Promise(resolve => setTimeout(resolve, 3000));
				conn.sendFile(m.chat, item.url, {
					quoted: m
				});
			}
		}
	}
};