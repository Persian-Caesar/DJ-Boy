const
    {
        useMainPlayer,
        QueueRepeatMode,
        useQueue,
        getVoiceConnections
    } = require("discord-player"),
    player = useMainPlayer();

/**
 * @description This is player class can be use play online resource in discord voice channel.
 * @example
 * ```js
 * // Load class.
 * const player = new Player(interaction);
 * 
 * // Play the url.
 * player.play("url");
 * 
 * // Get connection volume.
 * console.log(player.volume);  // output: <player.volume> like 100
 * 
 * // Set connection volume.
 * console.log(player.setVolume(50)); // output: 50
 * 
 * // Pause the player.
 * if(player.isPaused()) // If it's true it should be resumed.
 *  player.resume();
 * 
 * else
 *  // This one sould be paused.
 *  player.pause();
 * 
 * // Radio mode.
 * player.radio(["url"]);
 * 
 * // Stop the player.
 * player.stop();
 * ```
 */
module.exports = class Player {

    /**
     * 
     * @description To use this class with default settings you may to add "interaction" to it.
     * @param {import("discord.js").CommandInteraction} interaction 
     * @returns {Player}
     */
    constructor(interaction) {
        if (interaction)
            this.data = {
                channelId: interaction.member.voice?.channel.id,
                guildId: interaction.guild.id,
                selfDeaf: true
            };

        return this;
    }

    /**
     * 
     * @description Set player data's for using the class.
     * @param {import("@discordjs/voice").JoinVoiceChannelOptions & import("@discordjs/voice").CreateVoiceConnectionOptions} param0 
     * @returns {Player}
     */
    setData({ channelId, guildId, adapterCreator, selfDeaf = true }) {
        this.data = {
            channelId,
            guildId,
            adapterCreator,
            selfDeaf
        };
        return this;
    }

    /**
     * 
     * @description Set guild id of player data.
     * @param {string} guildId 
     * @returns {Player}
     */
    setGuildId(guildId) {
        this.data.guildId = guildId;
        return this;
    }

    /**
     * 
     * @description Set bot deaf in the voice channel.
     * @param {boolean} selfDeaf 
     * @returns {Player}
     */
    setSelfDeaf(selfDeaf) {
        this.data.selfDeaf = selfDeaf;
        return this;
    }

    /**
     * 
     * @description Set voice channel id to join or play something there.
     * @param {string} channelId 
     * @returns {Player}
     */
    setVoiceChannelId(channelId) {
        this.data.channelId = channelId;
        return this;
    }

    /**
     * 
     * @description Start playing resource in the voice.
     * @param {string} resource 
     * @returns {import("@discordjs/voice").AudioPlayer}
     */
    async play(resource) {
        const connection = this.join();
        const player = createAudioPlayer(audioPlayerData);
        player.play(
            createAudioResource(await this.#createStream(resource), audioResourceData)
        );
        connection.subscribe(player);
        audioPlayer.set(this.data.guildId, player);
        return player;
    }

    /**
     * 
     * @description Join to voice channel.
     * @param {string} guildId
     * @returns {import("@discordjs/voice").VoiceConnection}
     */
    join() {
        if (this.isConnection(this.data.guildId))
            return;

        return joinVoiceChannel(this.data);
    }

    /**
     * 
     * @description Find a voice connection and return it.
     * @returns {VoiceConnection}
     */
    get connection() {
        return getVoiceConnections().get(this.data.guildId);
    }

    /**
     * 
     * @description Find a voice connection and return it to boolean.
     * @param {string} guildId
     * @returns {boolean}
     */
    isConnection(guildId) {
        if (getVoiceConnection(guildId))
            return true;

        return false;
    }

    /**
     * 
     * @description Get player volume numver and return it.
     * @returns {number}
     */
    get volume() {
        const queue = useQueue(this.data.guildId);
        return Number(queue.node.volume);
    }

    /**
     * 
     * @description Find a voice connection and return it to boolean.
     * @param {number} input 
     * @returns {number}
     */
    setVolume(input) {
        const queue = useQueue(this.data.guildId);
        if (input <= 200 && input >= 0)
            queue.node.setVolume(input);

        return Number(this.volume);
    }

    /**
     * 
     * @description Check is player paused or not and return boolean.
     * @returns {boolean}
     */
    isPaused() {
        const queue = useQueue(this.data.guildId);
        if (queue.node.isPaused())
            return true;

        else return false;
    }

    /**
     * 
     * @description Pausing the player.
     * @returns {void}
     */
    pause() {
        const queue = useQueue(this.data.guildId);
        if (!this.isPaused())
            queue.node.pause();

        return this;
    }

    /**
     * 
     * @description Resuming the player.
     * @returns {void}
     */
    resume() {
        const queue = useQueue(this.data.guildId);
        if (this.isPaused())
            queue.node.resume();

        return this;
    }

    /**
     * 
     * @description Stop the player and break the connection.
     * @returns {void}
     */
    stop() {
        const queue = useQueue(this.data.guildId);
        queue.clear();
        queue.node.stop(true);
        return this;
    }

    /**
     * 
     * @description Radio mode: It's should be play some resources many times as a loop.
     * @param {Array<string>} resources 
     * @returns {import("discord-player").Player}
     */
    async radio(resources) {
        const player = await this.play(chooseRandom(resources));
        player.on("debug", async (e) => {
            const [oldStatus, newStatus] = e.replace("state change:", "").split("\n").map(value => value.replace("from", "").replace("to", "").replaceAll(" ", "")).filter(value => value !== "").map(value => JSON.parse(value));
            if (newStatus.status === "idle") {
                const player = await this.play(chooseRandom(resources));
                return player;
            }
        });
        player.on("error", async () => {
            const player = await this.play(chooseRandom(resources));
            return player;
        });
        return player;
    }

    /**
     * 
     * @param {string} message 
     * @returns {Error}
     */
    #error(message) {
        class error extends Error {
            constructor(message) {
                super();
                this.name = "Player";
                this.message = message;
            }
        }
        return new error(message);
    }

    /**
     * 
     * @param {string} url 
     * @returns {stream}
     */
    async #createStream(url) {
        try {
            const response = await fetch(url);
            url = response.url;
        } catch {
            url = url;
        }

        return url;
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