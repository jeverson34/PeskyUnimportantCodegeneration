const { Default_Prefix, Color, Support, Donate } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "Other",
  description: "Bot Help Command ;)",
  usage: "Help | <Command Name>",
  run: async (client, message, args) => {
    let Prefix = await db.fetch(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
    
    const Config = client.commands.filter(cmd => cmd.category === "Config").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    const Music = client.commands.filter(cmd => cmd.category === "Music").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    const Other = client.commands.filter(cmd => cmd.category === "Other").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
    .setTitle(`${client.user.username} Help!`)
    .setDescription(`Digite o seguinte comando para obter informações de um comando específico -\n**${Prefix}Help <Command Name>**\n\n**🎶 Music**\n${Music}\n\n**🔮 Other**\n${Other}\n\n**🕹 Config**\n${Config}\n\nUseful Links:\nSupport Server - [Click Me](${Support || "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLahKLy8pQdCM0SiXNn3EfGIXX19QGzUG3"})\nBot Link - [Click Me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)\nDonate: [Click Me](${Donate})\n\nMuito obrigado<3`)
    .setFooter(`Requerido por ${message.author.username}`)
    .setTimestamp();
    
    if (!args[0]) return message.channel.send(Embed);
    
    let command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
    
    if (!command) return message.channel.send(`Nenhum comando encontrado - ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}`);
    
    const Embeded = new Discord.MessageEmbed()
    .setColor(Color)
    .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
    .setTitle(`Informação de Comando!`)
    .addField(`Nome`, command.name.charAt(0).toUpperCase() + command.name.slice(1), true)
    .addField(`Categoria`, command.category || "Sem categoria", true)
    .addField(`Aliases`, command.aliases ? command.aliases.join(", ") : "Sem Aliases", true)
    .addField(`Usage`, command.usage, true)
    .addField(`Description`, command.description)
    .setFooter(`Requerido por ${message.author.username}`)
    .setTimestamp();
    
    return message.channel.send(Embeded);
  }
};