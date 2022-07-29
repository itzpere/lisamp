const { MessageEmbed, Guild } = require('discord.js');
const getServerData = require("./ServerData").getServerData

function playing (queue, track){
	const playing = new MessageEmbed()
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
		.setFooter({ text: track.id, iconURL: 'https://cdn.discordapp.com/app-icons/996836986948157460/0d45bfa4728b32e3b8f3e4c71da8fa84.png?size=256' });
	queue.metadata.channel.send({embeds: [playing]})
}
function config (message){
	let guild = message.guild
	let jsonFile = require(getServerData(message,"file"))
	let jsonString = JSON.stringify(jsonFile,null,4)
	const config = new MessageEmbed()
		.setColor(0x0099FF)
		.setTitle(`Config for ${guild.name}`)
		.setThumbnail(guild.iconURL)
		.addFields(
			{ name: 'Config', value: jsonString, inline: true }
		)
		.setTimestamp()
		.setFooter({text: guild.id, iconURL: 'https://cdn.discordapp.com/app-icons/996836986948157460/0d45bfa4728b32e3b8f3e4c71da8fa84.png?size=256' });
	message.channel.send({embeds:[config]})
}
module.exports = {
	currentlyplaying : playing,
	serverConfig : config

}