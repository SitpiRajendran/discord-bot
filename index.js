const { Client, EmbedBuilder, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const TwitchApi = require("node-twitch").default;
const twitch = new TwitchApi({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET
});


// Create a discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(process.env.DISCORD_TOKEN);
var SitpiIsLiving = false
var AscyamIsLiving = false


async function isLiving(username) {
    const streams = await twitch.getStreams({ channel: username });
    console.log(streams);
    if (streams.data.length == 0)
        return null;
    else
        return streams.data[0]
}

// When the discord client is ready
client.once('ready', () => {
    client.channels.fetch('689203844365680729').then(TwitchChannel => {
        setInterval(async function () {
            var datalive = await isLiving("sitpi")
            if (datalive != null && SitpiIsLiving == false) {
                SitpiIsLiving = true
                console.log(datalive.title)
                const exampleEmbed = new EmbedBuilder()
                    .setColor(0x85218B)
                    .setTitle(datalive.title)
                    .setURL('https://www.twitch.tv/' + datalive.user_login)
                    .setAuthor({ name: datalive.user_name, iconURL: 'https://cdn.pixabay.com/photo/2021/12/10/16/38/twitch-6860918_960_720.png', url: 'https://www.twitch.tv/' + datalive.user_login })
                    .setDescription(datalive.game_name)
                    .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/9125e1c3-0b1b-43e5-9d78-a14b153f8efe-profile_image-300x300.png')
                    .setImage('https://static-cdn.jtvnw.net/previews-ttv/live_user_' + datalive.user_login + '-1920x1080.jpg')
                    .setFooter({ text: "Commencé à " + datalive.started_at });
                TwitchChannel.send({ embeds: [exampleEmbed] })
                console.log("set sitpi to LIVE")
            }
            else if (datalive == null && SitpiIsLiving == true) {
                SitpiIsLiving = false
                console.log("unsetting sitpi to NOTLIVE")
            }
        }, 30000);
        setInterval(async function () {
            var datalive = await isLiving("Ascyam")
            if (datalive != null && AscyamIsLiving == false) {
                AscyamIsLiving = true
                console.log(datalive.title)
                const exampleEmbed = new EmbedBuilder()
                    .setColor(0x85218B)
                    .setTitle(datalive.title)
                    .setURL('https://www.twitch.tv/' + datalive.user_login)
                    .setAuthor({ name: datalive.user_name, iconURL: 'https://cdn.pixabay.com/photo/2021/12/10/16/38/twitch-6860918_960_720.png', url: 'https://www.twitch.tv/' + datalive.user_login })
                    .setDescription(datalive.game_name)
                    .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/411405db-2d4a-4aba-8663-bbac21352810-profile_image-300x300.png')
                    .setImage('https://static-cdn.jtvnw.net/previews-ttv/live_user_' + datalive.user_login + '-1920x1080.jpg')
                    .setFooter({ text: "Commencé à " + datalive.started_at });
                TwitchChannel.send({ embeds: [exampleEmbed] })
                console.log("set ascyam to LIVE")
            }
            else if (datalive == null && AscyamIsLiving == true) {
                AscyamIsLiving = false
                console.log("unsetting ascyam to NOTLIVE")
            }
        }, 30000);
    })
});

