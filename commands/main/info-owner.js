export let on = {
	names: ['Main Menu'],
	tags: ['owner'],
	command: ['owner', 'pemilik'],
	on: async (m, {
		conn,
		setting
	}) => {
		let ownerNumbers = setting.ownerNumber;
		let ownerLinks = [];
		let sendContact = (jid, numbers, name, quoted, mn) => {
			let number = setting.contact
			let vcard = 'BEGIN:VCARD\n' +
				'VERSION:3.0\n' +
				'FN:' + setting.ownerName + '\n' +
				'ORG:;\n' +
				'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' +
				'END:VCARD'
			return conn.sendMessage(m.chat, {
				contacts: {
					displayName: name,
					contacts: [{
						vcard
					}]
				},
				mentions: mn ? mn : []
			}, {
				quoted: quoted
			})
		}
		for (let i = 0; i < ownerNumbers.length; i++) {
			const number = ownerNumbers[i].replace("@s.whatsapp.net", "");
			ownerLinks.push(`wa.me/${number}`);
			if (i === 0) {
				await sendContact(m.chat, ownerNumbers[i], "", m);
			}
		}
		if (ownerLinks.length > 1) {
			let text = "رقم صاحب البوت";
			ownerLinks.forEach((link, index) => {
				text += `\n${index + 1}. ${link}`;
			});
			m.reply(text);
		}
	}
};