const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "shuffle",
  aliases: ["sf", "shufflequeue"],
  category: "Music",
  description: "Shuffle Music Queue!",
  usage: "Queue",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Junte-se a um canal de voz!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Nada está tocando agora, adicione algumas músicas à fila :D"
      );
    
    const Current = await Queue.Songs.shift();
    
    Queue.Songs = Queue.Songs.sort(() => Math.random() - 0.5);
    await Queue.Songs.unshift(Current);
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Sucesso")
    .setDescription("🎶 A fila foi embaralhada")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 A fila foi embaralhada"));
  }
};