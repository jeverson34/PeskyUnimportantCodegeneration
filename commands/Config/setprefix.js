const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "setprefix",
  aliases: ["newprefix", "sp"],
  category: "Config",
  description: "Definir o prefixo do bot!",
  usage: "Setprefix <New Prefix>",
  run: async (client, message, args) => {
    
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You Don't Have Enough Permission To Execute This Command - Manage Server");
    
    let Prefix = await db.fetch(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
    
    const NewPrefix = args.join(" ");
    
    if (!NewPrefix) return message.channel.send("Forneça um novo prefixo do bot!");
    
    if (NewPrefix.length > 10) return message.channel.send("Prefixo muito longo - limite de 10");
    
    if (NewPrefix === Prefix) return message.channel.send("O prefixo fornecido é o prefixo atual!");
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color || "RANDOM")
    .setTitle("Sucess")
    .setDescription(`Novo prefixo foi definido - ${NewPrefix}`)
    .setFooter(`Configurado por ${message.author.username}`)
    .setTimestamp();
    
    await db.set(`Prefix_${message.guild.id}`, NewPrefix);
    
    try {
      return message.channel.send(Embed);
    } catch (error) {
      return message.channel.send(`Novo prefixo foi definido - ${NewPrefix}`);
    };
  }
};