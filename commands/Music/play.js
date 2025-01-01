const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  NoSubscriberBehavior,
  StreamType
} = require("@discordjs/voice");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const {
  SoundCloud
} = require("scdl-core");
const ytsearch = require("youtube-search");
const ytdl = require("ytdl-core");
const spotify = require("spotify-api.js");
const error = require("../../functions/error");
const response = require("../../functions/response");
module.exports = {
  name: "play",
  description: "Play music in voice channel.",
  category: "Music",
  aliases: ["p", "music"],
  usage: "[query]",
  cooldown: 7,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks", "Speek", "Connect"],
  dm_permission: false,
  only_slash: true,
  interaction: true,
  only_owner: false,
  options: [{
    name: "query",
    description: "Write a music name or place music url.",
    type: ApplicationCommandOptionType.String,
    required: true
  }, {
    name: "ephemeral",
    description: "Hide this message?",
    choices: [{
      name: "Yes",
      value: "true"
    }, {
      name: "No",
      value: "false"
    }],
    type: ApplicationCommandOptionType.String,
    required: false
  }],

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").CommandInteraction} interaction 
   * @param {string} args 
   * @returns 
   */
  run: async (client, interaction, args) => {
    try {
      const db = client.db;
      const voiceChannel = interaction.member.voice?.channel;
      if (!voiceChannel) return await response(interaction, { content: "لطفا به یک ویس چنل عضو شوید تا بتوانید به موزیک گوش دهید." });
      const query = interaction.user ? interaction.options.getString("query") : args.join(" ");
      if (!query) return await response(interaction, { content: "لطفا نام یا اطلاعاتی که از آهنگ مورد نظر خود را درمقابل کامند بنویسید و سپس ارسال کنید تا موزیک پخش شود." });
      const info = await results(query);
      if (!info.title) return await response(interaction, { content: "موزیک مورد نظر شما یافت نشد." });
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator
      });
      const player = createAudioPlayer();
      const resource = createAudioResource(info.stream, {
        inputType: StreamType.Arbitrary,
        inlineVolume: true,
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
          maxMissedFrames: Math.round(5000 / 20),
        }
      });
      connection.subscribe(player);
      player.play(resource);
      const seconds = Number(info.duration);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const duration = `${hours ? `${hours}:` : ""}${remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
      const publishDate = new Date(info.createAt);
      const embed = new EmbedBuilder()
        .setDescription(`**اکنون موزیک به نام [${info.title}](${info.url}) درحال پخش میباشد.**`)
        .setFields([{
          name: `Music From:`,
          value: `**${info.author}**`
        }, {
          name: `Duration:`,
          value: `**${duration}**`
        }, {
          name: `Published At:`,
          value: `**<t:${Date.parse(publishDate) / 1000}:D> | <t:${Date.parse(publishDate) / 1000}:R>**`
        }])
        .setThumbnail(info.thumbnail)
        .setColor(client.colors.theme)
        .setTimestamp();

      const raw1 = new ActionRowBuilder().addComponents([new ButtonBuilder().setCustomId(`volumDown`).setEmoji(`🔈`).setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId(`lastTrack`).setEmoji(`⏮️`).setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId(`pause`).setEmoji(`⏸️`).setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId(`nextTrack`).setEmoji(`⏭️`).setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId(`volumUp`).setEmoji(`🔊`).setStyle(ButtonStyle.Secondary)]);
      const raw2 = new ActionRowBuilder().addComponents([new ButtonBuilder().setCustomId(`shuffle`).setEmoji(`🔀`).setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId(`seekBack`).setEmoji(`⏪`).setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId(`stop`).setEmoji(`❌`).setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId(`seekNext`).setEmoji(`⏩`).setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId(`loop`).setEmoji(`🔄`).setStyle(ButtonStyle.Secondary)]);
      await response(interaction, { content: `**درحال پخش: \`${info.title || undefined}\`**` });
      const msg = interaction.channel.send({
        embeds: [embed],
        components: [raw1, raw2]
      }).then(m => msg = m);
      player.on("idle", async () => {
        const queue = await db.get(`guild_${interaction.guild.id}.music.queue`);
        msg.edit({ components: [] });
        if (queue[1] && queue[1].title) {
          const {
            play,
            search
          } = require(`${process.cwd()}/functions/music`);
          await db.set(`guild_${interaction.guild.id}.music.queue`, queue.filter(q => q.title !== queue[0].title));
          await db.push(`guild_${interaction.guild.id}.music.last_queue`, queue[0]);
          return await play(channel, await search(queue[1].url, interaction.client), interaction);
        } else {
          connection.disconnect();
          await db.delete(`guild_${interaction.guild.id}.music`);
        };
      });

      /**
       * 
       * @param {string} query 
       * @returns 
      */
      async function results(query) {
        // if (query.includes("soundcloud")) {
        //   await SoundCloud.connect();
        //   const collection = await SoundCloud.search({ query: query, limit: 1 });
        //   const stream = await SoundCloud.download(collection.permalink_url).catch();
        //   if (stream) {
        //     const info = {
        //       stream: stream,
        //       duration: Math.floor(Number(collection.full_duration) / 1000),
        //       createAt: collection.created_at,
        //       author: collection.user.full_name,
        //       title: collection.title,
        //       url: collection.permalink_url,
        //       thumbnail: collection.artwork_url ? collection.artwork_url : collection.avatar_url
        //     };
        //     return info;
        //   };
        // } else if (query.includes("spotify")) {
        //   const spotifyAutho = new spotify.Client({
        //     token: {
        //       clientID: client.config.source.spotifyClientId,
        //       clientSecret: client.config.source.spotifyClientSecret
        //     }
        //   });
        //   const track = (await spotifyAutho.search(query, { types: 'track', limit: 1 })).tracks[0];
        //   const search = await ytsearch(`${track.name} ${track.artists.map(a => a.name).join(", ")}`, client.config.source.youtubeSearchOptions);
        //   const stream = ytdl(search.results[0].link, {
        //     filter: "audioonly",
        //     quality: "highestaudio"
        //   });
        //   if (stream) {
        //     const info = {
        //       stream: stream,
        //       duration: Math.floor(Number(track.duration) / 1000),
        //       createAt: track.album.releaseDate,
        //       author: track.artists.map(a => a.name).join(", "),
        //       title: track.name,
        //       url: track.externalURL.spotify,
        //       thumbnail: track.album.images[0].url
        //     };
        //     return info;
        //   };
        // } else {
        const search = await ytsearch(query, {
          maxResults: 1,
          key: "AIzaSyCI5_KOr6Tnh41ceG9zxUPi2hmxHaN4RVw",
          type: 'video'
        });
        const link = search.results[0].link;
        const collection = await ytdl.getInfo(link);
        if (link) {
          const stream = ytdl(link, {
            filter: "audioonly",
            quality: "highestaudio"
          });
          const info = {
            stream: stream,
            duration: collection.videoDetails.lengthSeconds,
            createAt: collection.videoDetails.publishDate,
            author: collection.videoDetails.author.name,
            title: collection.videoDetails.title,
            url: collection.videoDetails.video_url,
            thumbnail: collection.videoDetails.thumbnails[collection.videoDetails.thumbnails.length - 1].url
          };
          return info;
        };
        // };
      };
    } catch (e) {
      error(e);
      console.log(e)
      return response(interaction, { content: "یک مشکلی با پلیر پیش آمده است لطفا دوباره تلاش کنید." });
    }
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */