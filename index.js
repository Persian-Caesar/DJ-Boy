const discord = require("./components/discord");
const config = require("./config.json");
// const http = require('https');
// const fs = require('fs');

// const fileUrl = config.musicURL;
// const destination = 'music.mp3';

// const file = fs.createWriteStream(destination);

// http.get(fileUrl, (response) => {
//     response.pipe(file);
//     file.on('finish', () => {
//         file.close(() => {
//             console.log('File downloaded successfully');
//         });
//     });
// }).on('error', (err) => {
//     fs.unlink(destination, () => {
//         console.error('Error downloading file:', err);
//     });
// });

// نمونه استفاده از کلاس
const bot = new discord();
bot.login(config.token);

// ثبت یک ایونت
bot.on("READY", async (data) => {
    console.log(`Bot is ready: ${data.user.username}#${data.user.discriminator}`);
    await bot.changeAboutMe("SEX WITH YOUR MUM TONIGHT");
});

// ثبت یک ایونت دیگر
bot.on("MESSAGE_CREATE", async (message) => {
    if (config.owners.includes(message.author.id)) {
        if (message.content.startsWith("!sex")) {
            let channel_id = message.content.split(" ").slice(1).toString();
            bot.send(message, {
                content: "Doing SEX with you cock.",
                replied: true
            });
            bot.joinVoiceChannel(message.guild_id, channel_id);
            bot.play(message.guild_id, channel_id, config.musicURL)
        };

        if (message.content.startsWith("!aboutme")) {
            let text = message.content.split(" ").slice(1).toString();
            bot.send(message, {
                content: "Try to change the bot About Me.",
                replied: true
            });
        };
    }
});

// Anti Crash
process.on("uncaughtException", (e, or) => console.error(e));
process.on("message", (e, or) => console.error(e));
process.on("warning", (e, or) => console.error(e));
process.on("rejectionHandled", (e, or) => console.error(e));
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */