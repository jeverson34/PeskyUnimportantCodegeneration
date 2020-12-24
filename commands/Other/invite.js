const { Default_Prefix, Color, Owner, Support, Donate } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "invite",
  aliases: ["invitelink"],
  category: "Other",
  description: "Dê a você meu link de convite, Etc!",
  usage: "Invite",
  run: async (client, message, args) => {
    
    const Invite = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`, Owne = `<@${Owner}>`, Dev = `Legendary Emoji#1742`;
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Obrigado")
    .addField("Me convide", `[Click Me](${Invite})`, true)
    .addField("Servidor de Suporte", `[Click Me](${Support})`, true)
    .addField("Proprietário", Owne, true)
    .addField("Desenvolvedor", Dev)
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("Link de convite - " + Invite));
  }
};