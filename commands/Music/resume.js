const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "resume",
  aliases: ["restart", "back"],
  category: "Music",
  description: "Retomar a música!",
  usage: "Resume",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Junte-se a um canal de voz!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Nada está tocando agora, adicione algumas músicas à fila :D");
   
    if (Queue.Playing) return message.channel.send("🎶 Ja tocando");
    
    Queue.Playing = true;
    Queue.Bot.dispatcher.resume();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Sucesso")
    .setDescription("🎶 A música foi retomada!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 A música foi retomada!"));
  }
};