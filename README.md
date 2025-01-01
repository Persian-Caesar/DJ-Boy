# زبان فارسی
[![Deploy on Herokucd](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Sobhan-SRZA/Reaction-Music-Bot/)

[![Use on Replit](https://repl.it/badge/github/Sobhan-SRZA/Reaction-Music-Bot/)](https://repl.it/github/Sobhan-SRZA/Reaction-Music-Bot/)


## آدرس های من در فضای مجازی👇🏼🙃
آدرس [توییچ](https://www.twitch.tv/sobhan_srza)
 
آدرس کانال [تلگرام من](https://t.me/SobhanSRZA)

آدرس [اینستگرام](https://www.instagram.com/srza._.gamer)
 
آدرس [آپارات](https://www.aparat.com/Sobhan.SRZA)

آدرس [یوتوب](https://b2n.ir/srza.-.gamer)

آدرس [دیسکورد](https://discord.gg/bNpqrdXNNn)

آدرس [یوتوب](https://b2n.ir/srza._.action)


# 🤖 (ربات موسیقی دیسکورد)
> AD یک ربات موسیقی Discord است که با discord.js ساخته شده است و از Command Handler از [discordjs.guide](https://discordjs.guide) استفاده می کند.

## نصب و راه اندازی
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Sobhan-SRZA/Reaction-Music-Bot)


1. نحوه دریافت توکن ربات Discord **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. 2. YouTube Data API v3 Key **[راهنما](https://developers.google.com/youtube/v3/getting-started)**
3. SoundCloud دیگر API ارائه نمی کند، بنابراین نیازی به api نیست.**
4. Node.js نسخه 12.0.0 یا جدیدتر

## 🏁 شروع می کنیم

من ترجیح می دهم آن را روی repl.it اجرا کنم زیرا اطمینان بیشتری نسبت به **وبسایت glitch **می دهد. به repl.it [اینجا](https://repl.it/) بروید. برای دریافت برنامه هکر رایگان، به [اینجا](https://repl.it/claim) بروید.  و این کد را در آنجا قرار دهید


----

## 🧐 یک چشم انداز عمده

پس از تکمیل تمام اقساط مورد نیاز و تغییرات، به **Uptime Robot** [اینجا](https://uptimerobot.com/) بروید و در آنجا وارد شوید.. مانیتور را به عنوان "https" انتخاب کنید. سپس به یک لینک نیاز دارید.. می توانید لینک را در بخش وب پروژه خود دریافت کنید.. بار اول اگر پروژه را اجرا نمی کنید، آن بخش را نمی بینید. پروژه را اجرا کنید و می توانید آن را ببینید. سپس لینک را در ربات آپ تایم قرار دهید و هر نامی را انتخاب کنید و روی مانیتور کلیک کنید. ..و پروژه شما 24/7 آنلاین خواهد بود..

---

## 🔎 ساخت پروژه

**برای کاربران پیسی که از VS CODE استفاده میکنند** -

```
git clone https://github.com/Sobhan-SRZA/Reaction-Music-Bot.git

npm install
```

پس از اتمام نصب، می توانید از دستور «node index.js» برای راه اندازی ربات استفاده کنید.

**برای کاربران replit** -

**روی این ضربه بزنید --**

[![استفاده در Replit](https://repl.it/badge/github/Sobhan-SRZA/Reaction-Music-Bot/)](https://repl.it/github/Sobhan-SRZA/Reaction-Music-Bot/)

```
(npm i) را در کنسول تایپ کنید
```

## ⚙️ ساخت فایل

'config.json' مقادیر را پر کنید:

🚨🚨 **تعهد کردن توکن خود به دسترسی دیگران یا عمومی کردن آن اکیداً ممنوع است. بنابراین، توکن خود را به هیچ قیمتی به اشتراک نگذارید و از .gitignore برای مخفی کردن اسرار استفاده نکنید** 🚨🚨

```json
{
  "YOUTUBE_API_KEY": "AIzaSyAheHfo0S94kDWIs2nnfPQP4Kf6c8febrI",
  "SOUNDCLOUD_CLIENT_ID": "6gsNBd4mJwXr0LxTBh8VKBOrViK6Aj",
  "support_server": "YOUR_SERVER_LINK",
  "MAX_PLAYLIST_SIZE": 10,
  "PREFIX": "BOT_REFIX",
  "PRUNING": false,
  "LOCALE": "en",
  "STAY_TIME": 30,
  "DEFAULT_VOLUME": 100
}
```

زبان های موجود در حال حاضر عبارتند از:

• انگلیسی (en)
• فرانسوی (fr)
• اسپانیایی (es)
• ترکی (tr)
• کره ای (ko)
• پرتغالی برزیل (pt_br)
• چینی ساده شده (zh_cn)
• چینی سنتی (zh_tw)

## 📝 ویژگی ها و دستورات

> توجه: پرفیکس (پیشوند) پیش فرض '+' است

* 🎶 با استفاده از آدرس یوتیوب

«+play https://youtu.be/jS9l8O4AAWo».

* 🔎 پخش موسیقی از طریق نام

«+play srza gang».

* 🔎 جستجو و بازی کنید

«+search srza gamer».

با شماره آهنگ یا اعداد جدا شده با کاما که می خواهید پخش کنید پاسخ دهید

مثال‌ها: «1» یا «1،2،3».

* 📃 یک لیست پخش را مستقیماً از یوتیوب به Discord پخش کنید

`+playlist https://www.youtube.com/playlist?list=PLeiP6sSl8XyF7qcJ7WR6FjkpKtNBtzkqe`
![لیست پخش](https://cdn.discordapp.com/attachments/906688516140961802/938058904846340166/Music-CMD_-_Google_Chrome_2_1_2022_2_14_27_PM.png)

* 🔎 پخش لیست های پخش یوتیوب از طریق عبارت جستجو

«+playlist NCS Releases».
![جستجو](https://cdn.discordapp.com/attachments/906688516140961802/938059882832224316/Music-CMD_-_Google_Chrome_2_1_2022_4_43_13_PM.png)

**دستورات ربات ما**

* در حال پخش (np+)
* سیستم صف (queue, +q+)
* حلقه / تکرار (loop+)
* مخلوط کردن (shuffle+)
* کنترل صدا (volume، +v+)
* متن ترانه (lyrics, +ly+)
* مکث (pause+)
* رزومه (resume, +r+)
* پرش (skip, +s+)
* پرش به آهنگ # در صف (skipto، +st+)
* آهنگ # را از صف حذف کنید (remove, +rm+)
* حذف هرس پیام های ربات (pruning+)
* راهنما (help، +h+)
* Command Handler از [discordjs.guide](https://discordjs.guide/)
* ربات Discord شما را از طریق Reactions کنترل می کند
![Reactions](https://cdn.discordapp.com/attachments/906688516140961802/938066570691887166/Music-CMD_-_Google_Chrome_2_1_2022_5_10_50_PM.png)


اعتبار اصلی به [Sobhan-SRZA@](https://github.com/Sobhan-SRZA/) برای ساخت DJ BOY با موفقیت بهترین ربات موسیقی...😍
مخزن DJ BOY را از اینجا دریافت کنید -
https://github.com/Sobhan-SRZA/Reaction-Music-Bot



## Language EN
[![Deploy on Herokucd](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Sobhan-SRZA/Reaction-Music-Bot/)

[![Use on Replit](https://repl.it/badge/github/Sobhan-SRZA/Reaction-Music-Bot/)](https://repl.it/github/Sobhan-SRZA/Reaction-Music-Bot/)

## My addresses in cyberspace 👇🏼🙃📡


[Twich](https://www.twitch.tv/sobhan_srza) address
 
My [Telegram](https://t.me/SobhanSRZA) Channel Address

[Instegram](https://www.instagram.com/srza._.gamer) address
 
Address of the [Aparat](https://www.aparat.com/Sobhan.SRZA)

[YouTube](https://b2n.ir/srza.-.gamer) address

[Discord](https://discord.gg/bNpqrdXNNn)address

[YouTube](https://b2n.ir/srza._.action) address




# 🤖 (Discord Music Bot)
> AD is a Discord Music Bot built with discord.js & uses Command Handler from [discordjs.guide](https://discordjs.guide)

## Installation
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Sobhan-SRZA/Reaction-Music-Bot)


1. How to obtain a Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. YouTube Data API v3 Key **[Guide](https://developers.google.com/youtube/v3/getting-started)**  
3. SoundCloud is no more providing APIs so no need of api.**
4. Node.js v12.0.0 or newer

## 🏁 Starting

I will prefer to run it on repl.it as it gives more convinience than glitch website.. Go to repl.it [here](https://repl.it/).To gain free hacker plan, go to [here](https://repl.it/claim) and paste this code there


----

## 🧐 A Major Outlook

After Completing all the required installments and the changes head over to Uptime Robot [here](https://uptimerobot.com/) and login there..Choose the monitor as `https`.Then you would need a link..You could get the link in the web section of you project..First time if you dont run the project you could not see that section.Run the project and you could see it.Then paste the link in uptime robot and take any name and click monitor..And your project will be online 24/7..

---

## 🔎 Making The Project

**For PC users using VS Code** -

```
git clone https://github.com/Sobhan-SRZA/Reaction-Music-Bot.git

npm install
```

After installation finishes you can use `node index.js` to start the bot.

**For replit users** -

**Tap on this --**

[![Use on Repl.it](https://repl.it/badge/github/Sobhan-SRZA/Reaction-Music-Bot/)](https://repl.it/github/Sobhan-SRZA/Reaction-Music-Bot/)

```
Type (npm i) in console
```

## ⚙️ Making Files

`config.json` fill out the values:

🚨🚨 **Commiting your token to be accessed by others or making it public is strictly prohibited.So, dont share your token in any cost or use .gitignore to hide secrets** 🚨🚨

```json
{
  "YOUTUBE_API_KEY": "AIzaSyAheHfo0S94kDWIs2nnfPQP4Kf6c8febrI",
  "SOUNDCLOUD_CLIENT_ID": "6gsNBd4mJwXr0LxTBh8VKBOrViK6Aj",
  "support_server": "YOUR_SERVER_LINK",
  "MAX_PLAYLIST_SIZE": 10,
  "PREFIX": "BOT_REFIX",
  "PRUNING": false,
  "LOCALE": "en",
  "STAY_TIME": 30,
  "DEFAULT_VOLUME": 100
}
```

Currently available locales are:

• English (en)
• French (fr)
• Spanish (es)
• Turkish (tr)
• Korean (ko)
• Brazilian Portuguese (pt_br)
• Simplified Chinese (zh_cn)
• Traditional Chinese (zh_tw)

## 📝 Features & Commands

> Note: The default prefix is '+'

* 🎶 Using YouTube Url

`+play https://www.youtube.com/c/ANDROIDDISCORD`

* 🔎 Playing music via Name

`+play Let me love you`

* 🔎 Search and play

`+search NCS Astronomia`

Reply with song number or numbers seperated by comma that you wish to play

Examples: `1` or `1,2,3`

* 📃 Play a playlist directly from youtube to Discord

`+playlist https://www.youtube.com/playlist?list=PLeiP6sSl8XyF7qcJ7WR6FjkpKtNBtzkqe`
![playlist](https://cdn.discordapp.com/attachments/906688516140961802/938058904846340166/Music-CMD_-_Google_Chrome_2_1_2022_2_14_27_PM.png)

* 🔎 Play youtube playlists via search query

`+playlist NCS Releases`
![search](https://cdn.discordapp.com/attachments/906688516140961802/938059882832224316/Music-CMD_-_Google_Chrome_2_1_2022_4_43_13_PM.png)

**Commands of Our Bot**

* Now Playing (+np)
* Queue system (+queue, +q)
* Loop / Repeat (+loop)
* Shuffle (+shuffle)
* Volume control (+volume, +v)
* Lyrics (+lyrics, +ly)
* Pause (+pause)
* Resume (+resume, +r)
* Skip (+skip, +s)
* Skip to song # in queue (+skipto, +st)
* Remove song # from queue (+remove, +rm)
* Toggle pruning of bot messages (+pruning)
* Help (+help, +h)
* Command Handler from [discordjs.guide](https://discordjs.guide/)
* Controls your Discord Bot via Reactions
![reactions](https://cdn.discordapp.com/attachments/906688516140961802/938066570691887166/Music-CMD_-_Google_Chrome_2_1_2022_5_10_50_PM.png)


Main Credits go to [@Sobhan-SRZA](https://github.com/Sobhan-SRZA/) for making DJ BOY successfully the best music bot...😍
Get evobot repo here - 
https://github.com/Sobhan-SRZA/Reaction-Music-Bot

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=Sobhan-SRZA&repo=Reaction-Music-Bot&theme=dracula)](https://github.com/Sobhan-SRZA/Reaction-Music-Bot)

