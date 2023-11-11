import translate from '@vitalets/google-translate-api'
export let on = {
	names: ['Tools'],
	tags: ['translate'],
	command: ['translate', 'tr'],
	limit: 2,
	on: async (m, {
		args,
		prefix,
		text,
		command
	}) => {
		if (!text) return m.reply('مثال :\n.tr *ar* hello')
		var lang, text
		if (args.length >= 2) {
			lang = args[0] ? args[0] : 'ar', text = args.slice(1).join(' ')
		} else if (m.quoted && m.quoted.text) {
			lang = args[0] ? args[0] : 'ar', text = m.quoted.text
		} else m.reply(`مثال:\n ${prefix + command} ar hello i am robot`)
		let res = await translate(text, {
			to: lang,
			autoCorrect: true
		}).catch(_ => null)
		if (!res) m.reply(`error`)
		m.reply(`*لغة النص:* ${res.from.language.iso}\n*اللغة التي تريد الترجمة لها:* ${lang}\n\n*هذه ترجمتك سيدي:* ${res.text}`.trim())
	}
};