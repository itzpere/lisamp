const { EmbedBuilder } = require('discord.js');

async function playing (queue, track){
	const { back, leave, skip } = require('./music-logic.js');
	const play = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle(track.title)
		.setURL(track.url)
		.setAuthor({ name: track.author })
		.setThumbnail(track.thumbnail)
		.addFields(
			{ name: 'Time', value: track.duration.toString(), inline: true },
			{ name: 'Views', value: track.views.toString(), inline: true },
		)
		.setTimestamp()
		.setFooter({ text: track.id, iconURL: queue.metadata.message.guild.members.me.displayAvatarURL()});

		let time,array,seconds;
		time = track.duration;
		array = time.split(":");
		if (array.lenght === 3)
		seconds = (parseInt(array[0], 10) * 60 * 60) + (parseInt(array[1], 10) * 60) + parseInt(array[2], 10)
		else
		seconds = (parseInt(array[0], 10) * 60) + parseInt(array[1], 10)

		queue.metadata.channel.send({embeds: [play]}).then(msg => {
			const filter = (reaction, user) => {
				return ['⏪', '⏹️', '⏭️'].includes(reaction.emoji.name) && user.id;
			}
			msg.react('⏪')
			.then(() => msg.react('⏹️'))
			.then(() => msg.react('⏭️'))
			.then(() => setTimeout(async function() {
				msg.awaitReactions({ filter, max: 1, time: seconds * 1000 + 1000, errors: ['time'] }).then(collected => {
					const reaction = collected.first();
					switch (reaction.emoji.name){
						case '⏪':
							back(msg)
							msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions:', error));
						break;
						case '⏹️':
							leave(msg)
							msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions:', error));
						break;
						case '⏭️':
							skip(msg)
							msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions:', error));
						break;
					}
				})
			}, 500)) //delay because .then is not waiting for react to finish sending
			//todo dodaj pause tako sto ces da colllectujes vise reakcija a ne samo prvu
			}).catch(() => {
				msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions:', error));
			});
}
module.exports = {
	currentlyplaying : playing

}