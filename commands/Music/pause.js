const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "pause",
  aliases: ["wait"],
  category: "Music",
  description: "Pausar música!",
  usage: "Pause",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Junte-se a um canal de voz!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Nada está tocando agora, adicione algumas músicas à fila :D");
   
    if (!Queue.Playing) return message.channel.send("🎶 Já pausado");
    
    Queue.Playing = false;
    Queue.Bot.dispatcher.pause();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Sucesso")
    .setDescription("🎶 A música foi pausada!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 A música foi pausada!"));
  }
};