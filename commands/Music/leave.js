const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "leave",
  aliases: ["goaway", "disconnect"],
  category: "Music",
  description: "Sair do canal de voz!",
  usage: "Leave",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Junte-se a um canal de voz!");
    
    if (!message.guild.me.voice) return message.channel.send("Eu não estou em nenhum canal de voz!");
    
    try {
    
    await message.guild.me.voice.kick(client.user.id);
      
    } catch (error) {
      await message.guild.me.voice.kick(message.guild.me.id);
      return message.channel.send("Tentando sair do canal de voz...");
    };
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Sucesso")
    .setDescription("🎶 Sai do canal de voz :C")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Sai do canal de voz :C"));
  }
};