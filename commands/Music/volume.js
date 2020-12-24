const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "volume",
  aliases: ["vol"],
  category: "Music",
  description: "Mostrar o volume e você também pode definir o volume!",
  usage: "Volume | <1 - 150>",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Junte-se a um canal de voz!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Nada está tocando agora, adicione algumas músicas à fila :D"
      );

    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Volume")
      .setDescription(`🎶 Volume - ${Queue.Volume}`)
      .setTimestamp();

    if (!args[0]) return message.channel.send(Embed).catch(() => message.channel.send(`🎶 Volume - ${Queue.Volume}`));

    if (args[0]) {
      if (isNaN(args[0]))
        return message.channel.send("Forneça um número válido!");
      if (args[0] > 150) return message.channel.send("Limite de Volume: 150");
      if (parseInt(Queue.Volume) === parseInt(args[0]))
        return message.channel.send("O volume atual é o mesmo!");

      Queue.Volume = parseInt(args[0]);
      Queue.Bot.dispatcher.setVolumeLogarithmic(Queue.Volume / 100);
      
      const Embeded = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Sucesso")
      .setDescription(`🎶 O volume foi alterado - ${Queue.Volume}`)
      .setTimestamp();
      
      return message.channel.send(Embeded).catch(() => message.channel.send(`🎶 O volume foi alterado - ${Queue.Volume}`));
    };
  }
};
