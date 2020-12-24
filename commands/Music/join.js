const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "join",
  aliases: ["come"],
  category: "Music",
  description: "Junte-se ao canal de voz!",
  usage: "Join",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Junte-se a um canal de voz!");
    
    if (!Channel.joinable) return message.channel.send("Não consigo entrar no canal de voz!");
    
    await Channel.join().catch(() => {
      return message.channel.send("Incapaz de entrar no canal de voz!");
    });
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Sucesso")
    .setDescription("🎶 Ingressou no Voice Channel, use o comando Play para tocar música!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Ingressou no Voice Channel, use o comando Play para tocar música!"));
  }
};