const { EmbedBuilder } = require('discord.js');

function playing (queue, track){
	const playing = new EmbedBuilder()
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
	queue.metadata.channel.send({embeds: [playing]})
}
module.exports = {
	currentlyplaying : playing

}