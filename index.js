import { Client, GatewayIntentBits, Collection, Events, EmbedBuilder } from "discord.js";
import fs from "fs";
import path from "path";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(3000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
client.mediaOnlyChannel = null;

const commandsPath = path.join(process.cwd(), "komutlar");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = (await import(`file://${filePath}`)).default;
  if (!command?.name || !command?.execute) continue;
  client.commands.set(command.name, command);
}

client.once('clientReady', () => {
  console.log(`${client.user.tag} olarak giriş yapıldı!`);

  setTimeout(() => {
    client.user.setPresence({
      activities: [
        { name: 'Kick: xWoodyWalker', type: 0 }
      ],
      status: 'online'
    });
  }, 5000);
});

const PREFIX = "!";

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  if (client.mediaOnlyChannel && message.channel.id === client.mediaOnlyChannel) {
    if (message.attachments.size === 0) {
      await message.delete().catch(() => {});
      return;
    }
  }

  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const name = args.shift().toLowerCase();

  const command = client.commands.get(name);
  if (!command) return;

  await command.execute(message, args);
});

client.on(Events.GuildMemberAdd, async member => {
  const channelIds = [
    "1185514368390152212",
    "1454178701733531789"
  ];

  const embed = new EmbedBuilder()
    .setTitle("WoodyWalker Discord Topluluğuna Hoşgeldin")
    .setDescription(
`${member}

Aramıza Hoşgeldin Dostum!
Herkes Yeni Üyemize Hoşgeldin Desinn!!

https://kick.com/xwoodywalker`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setColor(0x00ff99)
    .setFooter({ text: "İyi Sohbetler Dileriz" });

  for (const id of channelIds) {
    const channel = member.guild.channels.cache.get(id);
    if (channel) {
      await channel.send({ embeds: [embed] }).catch(() => {});
    }
  }
});

client.login(process.env.TOKEN);
