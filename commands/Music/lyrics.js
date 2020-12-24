const { Default_Prefix, Color } = require("../../config.js");
const { Splitter } = require("../../Functions.js");
const Discord = require("discord.js");
const Finder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  category: "Music",
  description: "Mostrar letras de músicas!",
  usage: "Lyrics",
  run: async (client, message, args) => {
    
    const Queue = client.queue.get(message.guild.id);
    
    if (!Queue && !args[0]) return message.channel.send("Por favor, dê algo para pesquisar!");
    
    let Lyric, Thing = Queue ? Queue.Songs[0].Title : args.join(" ");
    
    try {
      Lyric = await Finder(Thing, '');
      if (!Lyric) {
        if (Queue && args[0]) {
          Lyric = await Finder(args.join(" "), '');
        } else {
          return message.channel.send("Nenhuma letra encontrada - " + Thing);
        };
      };
    } catch (error) {
      return message.channel.send("Nenhuma letra encontrada - " + Thing);
    };
    
    Lyric = await Lyric.replace(/(.{2040})/g,"\n1\n");
    
    return message.channel.send(Lyric, { split: { char: "\n" }});
  }
};