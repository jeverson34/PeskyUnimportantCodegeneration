const { Default_Prefix, Color } = require("../../config.js");
const { Player, Objector } = require("../../Functions.js");
const Discord = require("discord.js");
const db = require("wio.db"),
  Sr = require("youtube-sr"),
  Ytdl = require("discord-ytdl-core");

module.exports = {
  name: "search",
  aliases: [],
  category: "Music",
  description: "Pesquisar música!",
  usage: "Search",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Junte-se a um canal de voz!");
    if (!args[0]) return message.channel.send("Por favor, dê uma consulta para pesquisar!");

    const Queue = await client.queue.get(message.guild.id);

    if (
      !Channel.permissionsFor(message.guild.me).has("CONNECT") ||
      !Channel.permissionsFor(message.guild.me).has("SPEAK")
    )
      return message.channel.send(
        "Não tenho permissões suficientes para tocar música - Connect , Speak"
      );

    if (!Channel.joinable)
      return message.channel.send("Não consigo entrar no canal de voz!");

    await Sr.search(args.join(" "), { limit: 10 }).then(async Data => {
      if (!Data[0].id)
        return message.channel.send(
          "Error: Algo deu errado ou nenhum vídeo foi encontrado"
        );
      const All = await Data.map(
          (Video, Position) =>
            `${Position + 1}. **[${
              Video.title.length > 100 ? Video.title + "..." : Video.title
            }](https://youtube.com/watch?v=${Video.id})**`
        ),
        Filter = m => m.author.id === message.author.id;
      
      const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Por favor escolha")
      .setDescription(All)
      .setFooter("Selecione entre 1 - 10, Tempo: 5 minutos")
      .setTimestamp();
      
      message.channel.send(Embed).catch(() => message.channel.send(`Selecione entre 1 - 10, Tempo: 5 minutos\n\n${All}`))

      await message.channel
        .awaitMessages(Filter, { max: 1, time: 300000, errors: ["time"] })
        .then(async Msg => {
          let Content = parseInt(Msg.first().content),
            SongInfo = null,
            Song = null;
          Msg = Msg.first();
          if (isNaN(Content))
            return message.channel.send(
              "Número inválido fornecido, pesquisa cancelada"
            );
          if (Content - 1 > All.length || !All[Content])
            return message.channel.send(
              "Número inválido fornecido, pesquisa cancelada"
            );

          try {
            const Find = await Data.find(Dat => Dat === Data[Content - 1]);
            console.log(Find);
            const YtInfo = await Ytdl.getInfo(
              `https://youtube.com/watch?v=${Find.id}`
            );
            SongInfo = YtInfo.videoDetails;
            Song = await Objector(SongInfo, message);
          } catch (error) {
            console.log(error)
            return message.channel.send("Error: Algo deu errado");
          }

          let Joined;
          try {
            Joined = await Channel.join();
          } catch (error) {
            console.log(error);
            return message.channel.send(
              "Error: Não consigo entrar no canal de voz!"
            );
          }

          if (Queue) {
            const Embed = new Discord.MessageEmbed()
              .setColor(Color)
              .setTitle("Musica Adicionada!")
              .setThumbnail(Song.Thumbnail)
              .setDescription(
                `[${Song.Title}](${Song.Link}) Foi adicionado à fila!`
              )
              .setTimestamp();
            await Queue.Songs.push(Song);
            return message.channel
              .send(Embed)
              .catch(() =>
                message.channel.send("A música foi adicionada à fila!")
              );
          }

          const Database = {
            TextChannel: message.channel,
            VoiceChannel: Channel,
            Steam: null,
            Bot: Joined,
            Songs: [],
            Filters: {},
            Volume: 100,
            Loop: false,
            Always: false,
            Playing: true
          };

          await client.queue.set(message.guild.id, Database);

          await Database.Songs.push(Song);

          try {
            await Player(message, Discord, client, Ytdl, {
              Play: Database.Songs[0],
              Color: Color
            }, db);
          } catch (error) {
            console.log(error);
            await client.queue.delete(message.guild.id);
            await Channel.leave().catch(() => {});
            return message.channel.send(
              "Error: Algo deu errado com o bot interno"
            );
          }
        });
    });
  }
};
