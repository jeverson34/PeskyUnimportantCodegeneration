const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "filters",
  aliases: ["ft"],
  category: "Music",
  description: "Show Music Filters!",
  usage: "Filters | <Filter Name>",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Junte-se a um canal de voz!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Nada está tocando agora, adicione algumas músicas à fila :D"
      );

    const Filters = ["nightcore", "bassboost", "vaporwave", "phaser", "treble", "normalizer", "flanger"];
    const One = [];

    await Filters.forEach(async Filter => {
        let Status = await Queue.Filters[Filter] ? "Ativado - ✅" : "Desativado - ❌";
        await One.push(`${Filter.charAt(0).toUpperCase() + Filter.slice(1)} - ${Status}`);
    });

    if (!args[0])
      return message.channel.send("```" + One.join("\n") + "```", { split: { char: "\n" } });

    if (!Filters.find(Fil => Fil === args[0].toLowerCase()))
      return message.channel.send(
        `Nenhum filtro encontrado - ` +
          args[0].charAt(0).toUpperCase() +
          args[0].slice(1)
      );

    args[0] = args[0].toLowerCase();
    
    let Finder = await Filters.find(Fil => Fil === args[0]);

    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Informação do Filtro")
      .addField("Nome", Finder.charAt(0).toUpperCase() + Finder.slice(1))
      .addField("Status", Queue.Filters[args[0]] ? "Ativado" : "Desativado")
      .setFooter(`Requerido por ${message.author.username}`)
      .setTimestamp();

    return message.channel
      .send(Embed)
      .catch(() =>
        message.channel.send(
          `${args[0].charAt(0).toUpperCase() + args[0].slice(1)} - ${
            Queue.Filters[args[0]] ? "Ativado" : "Disativado"
          }`
        )
      );
  }
};
