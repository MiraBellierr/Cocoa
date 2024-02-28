module.exports = (client, message) => {
	if (message.channel.id !== "1212255603058016317") {
		const args = message.content.split(" ");
		let id = "";

		if (args.length > 1) return message.delete();

		if (message.author.id === id) {
			return message.delete();
		} else {
			id = message.author.id;
		}
	}
};
