export let on = {
	tags: ['restart'],
	command: ['restart', 'reset', 'reboot'],
	owner: true,
	on: async (m, {
		text
	}) => {
		m.reply(`Merestart bot......`);
		setTimeout(async () => {
			await process.send("reset");
		}, 2000);
	}
};