const WebSocket = require("ws");
const EventEmitter = require("events");
const { opus } = require("prism-media");
const axios = require("axios");
const https = require("https");
const ChannelsCache = require("./cache/channels");
const fs = require("fs");
module.exports = class discord extends EventEmitter {
    constructor() {
        super();
        this.token = null;
        this.gatewayURL = null;
        this.ws = null;
        this.readyTimestamp = null;
    }

    #error(message) {
        class error extends Error {
            constructor(message) {
                super();
                this.name = "DiscordJS";
                this.message = message;
            }
        }
        throw new error(message);
    }

    async #DiscordRequest(endpoint, options = {}) {
        // append endpoint to root API URL
        const url = 'https://discord.com/api/v10/' + endpoint;
        // Stringify payloads
        if (options.body) options.body = JSON.stringify(options.body);
        // Use fetch to make requests
        const res = await fetch(url, {
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            },
            ...options
        });
        // throw API errors
        if (!res.ok) {
            const data = await res.json();
            console.log(res.status);
            this.#error(JSON.stringify(data));
        }
        // return original response
        return res;
    }

    async #getGateway() {
        try {
            const response = await this.#DiscordRequest("gateway/bot").then(a => a.json());
            const { url } = response;
            if (url === undefined) throw "Gateway Error: discord bot token is invalid";
            this.gatewayURL = `${url}/?v=10&encoding=json`;
            // console.log("Gateway URL:", this.gatewayURL);
            return this;
        } catch (error) {
            this.#error(error);
        }
    }

    get readyAt() {
        return this.readyTimestamp && new Date(this.readyTimestamp);
    }

    get uptime() {
        return this.readyTimestamp && Date.now() - this.readyTimestamp;
    }

    #connectWebSocket() {
        if (!this.gatewayURL) {
            this.#error("Gateway URL is not set.");
            return;
        }

        this.ws = new WebSocket(this.gatewayURL);

        this.ws.on("open", () => {
            console.log("WebSocket connection opened.");

            const identifyPayload = {
                op: 2,
                d: {
                    token: this.token,
                    intents: 64391,
                    properties: {
                        $os: "linux",
                        $browser: "my_library",
                        $device: "my_library",
                    },
                },
            };

            this.ws.send(JSON.stringify(identifyPayload));
        });

        this.ws.on("message", (message) => {
            const data = JSON.parse(message);
            this.emit(data.t, data.d);
        });

        this.ws.on("close", (code, reason) => {
            this.#error(`WebSocket connection closed with code ${code}. Reason: ${reason}`);
        });

        this.ws.on("error", (error) => {
            this.#error("WebSocket error:", error);
        });
        return this;
    }

    // get channels() {
    //     return new ChannelsCache(this)
    // }

    async send(message, { content, embeds, components, replied }) {
        const path = `/channels/${message.channel_id}/messages`;
        const data = {
            content: content
        };
        if (replied) data.message_reference = {
            message_id: message.id,
        };

        if (embeds !== null) data.embeds = embeds;

        if (components !== null) data.components = components;

        try {
            const response = await fetch(`https://discord.com/api/v10${path}`, {
                "method": "POST",
                "headers": {
                    "Authorization": `Bot ${this.token}`,
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(data)
            });

            if (response.ok) {
                console.log("Message sent successfully.");
            } else {
                this.#error("Error sending message:", response.status, response.statusText);
            }
            return this;
        } catch (error) {
            this.#error("Error sending message:", error.message);
        }
    }

    async joinVoiceChannel(guildId, channelId) {
        const data = {
            "op": 4,
            "d": {
                guild_id: guildId,
                channel_id: channelId,
                self_mute: false,
                self_deaf: true
            }
        };

        try {
            this.ws.send(JSON.stringify(data));
            console.log("Joined voice channel successfully.");
        } catch (error) {
            this.#error("Error joining voice channel:", error.message);
        }
        return this;
    }

    async play(guildId, channelId, url) {
        try {
            // درخواست دانلود فایل MP3
            const opusEncoder = new opus.Encoder({ channels: 2, rate: 48000, frameSize: 960 });
            const readableStream = fs.createReadStream("./music.mp3");
            const opusFrameData = {
                op: 4, // OPUS_FRAME
                d: {
                    guild_id: guildId,
                    channel_id: channelId,
                    self_mute: false,
                    self_deaf: true,
                    self_video: false
                }
            };
            const res = https.request(url);

            const data = {
                // op: 5,
                // d: {
                //     speaking: 5,
                //     delay: 0,
                //     ip: res.host,
                //     modes: ["xsalsa20_poly1305", "xsalsa20_poly1305_suffix", "xsalsa20_poly1305_lite"],
                //     heartbeat_interval: 1
                // }

                "op": 4,
                "d": {
                    "mode": "aead_aes256_gcm_rtpsize",
                    "secret_key": []
                }

            };
            this.ws.send(JSON.stringify(data));
            readableStream
                .on("data", (chunk) => {
                    data.d.secret_key.push(chunk);
                })
                .on("end", () => {
                    this.#DiscordRequest();
                    // this.ws.send(JSON.stringify(data));
                    console.log("Music playback complete.");
                });

            return this;
        } catch (error) {
            this.#error("Playing music from link\n" + error)
        }
    }

    async getbuffer(url) {
        try {
            var result = await axios
                .get(url, {
                    responseType: "arraybuffer"
                })
                .then(response => new Buffer.from(response.data, "binary"))
            return result
        } catch (e) {
            return { error: e };
        }
    }

    async changeAboutMe(text) {
        const path = "/users/@me";
        const data = {
            bio: text
        };

        try {
            // const response = await fetch(`https://discord.com/api/v10${path}`, {
            //     "method": "post",
            //     "headers": {
            //         "Authorization": `Bot ${this.token}`,
            //         "Content-Type": "application/json",
            //     },
            //     "body": JSON.stringify(data)
            // });
            // console.log(await response.json())
            this.ws.send(JSON.stringify({
                "op": 3,
                "d": {
                    "since": 1,
                    "activities": [{
                        "name": "Twitch",
                        "type": 4,
                        "state": "sex with me",
                        "buttons": [{
                            "label": "SEX",
                            "url": "https://www.twitch.tv/discord"
                        }]
                    }],
                    "status": "online",
                    "afk": false
                }
            }));
            // if (response.ok) {
            //     console.log("Bot description changed successfully.");
            // } else {
            //     this.#error("Error changing Bot description:", response.status, response.statusText);
            // }
            return this;
        } catch (error) {
            this.#error("Error:", error.message);
        }
    }

    /**
     * 
     * @param {string} token 
     * @returns 
     */
    login(token) {
        this.token = token;
        this.#getGateway().then(() => {
            this.#connectWebSocket();
        });
        process.on("uncaughtException", (e, or) => this.#error(e));
        process.on("message", (e, or) => this.#error(e));
        process.on("warning", (e, or) => this.#error(e));
        process.on("rejectionHandled", (e, or) => this.#error(e));
        return this;
    }

    async destroy() {
        this.rest.clearHashSweeper();
        this.rest.clearHandlerSweeper();
        this.sweepers.destroy();
        await this.ws.destroy();
        this.token = null;
        this.rest.setToken(null);
    }
}