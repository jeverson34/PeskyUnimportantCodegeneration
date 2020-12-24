const { Default_Prefix, Color } = require("../../config.js");
const { Player } = require("../../Functions.js")
const Discord = require("discord.js"), Ytdl = require("discord-ytdl-core"), db = require("wio.db");

module.exports = {
  name: "bassboost",
  aliases: ["bb"],
  category: "Music",
  description: "Habilitar ou desabilitar Bassboost!",
  usage: "Bassboost",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Junte-se a um canal de voz!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Nada está tocando agora, adicione algumas músicas à fila: D"
      );

    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Sucesso")
      .setDescription(`🎶 Bassboost foi ${Queue.Filters["bassboost"] ? "Disativado" : "Ativado"}`)
      .setTimestamp();
    
    Queue.Filters["bassboost"] = Queue.Filters["bassboost"] ? false : true;
    
    await Player(message, Discord, client, Ytdl, { Filter: true, Play: Queue.Songs[0], Color: Color }, db);

    return message.channel.send(Embed).catch(() => message.channel.send(`🎶 Nightcore foi ${Queue.Filters["bassboost"] ? "Disativado" : "Ativado"}`));
    
  }
};
