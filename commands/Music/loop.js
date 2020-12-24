const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "loop",
  aliases: ["lp"],
  category: "Music",
  description: "Mostrar status do loop e você também pode definir o status do loop!",
  usage: "Loop | <On Or Off>",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Junte-se a um canal de voz!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Nada está tocando agora, adicione algumas músicas à fila: D");
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Loop Status")
    .setDescription(`🎶 Loop Status - ${Queue.Loop ? "On" : "Off"}`)
    .setTimestamp();
    
    if (!args[0]) return message.channel.send(Embed);
    
    const Settings = ["on", "off"];
    
    if (!Settings.find(Set => Set === args[0].toLowerCase())) return message.channel.send("Opção inválida fornecida - On , Off");
    
    const Status = Queue.Loop ? "on" : "off";
    
    args[0] = args[0].toLowerCase();
    
    if (args[0] === Status) return message.channel.send(`Já ${Queue.Loop ? "On" : "Off"}`);
    
    const Embeded = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Sucesso")
    .setTimestamp();
    
    if (args[0] === "on") {
      Queue.Loop = true;
      Embeded.setDescription("🎶 Loop foi ativado!")
      return message.channel.send(Embeded).catch(() => message.channel.send("Loop foi ativado!"))
    } else {
      Queue.Loop = false;
      Embeded.setDescription("🎶 Loop foi desativado!");
      return message.channel.send(Embeded).catch(() => message.channel.send("Loop foi desativado!"));
    };
  }
};