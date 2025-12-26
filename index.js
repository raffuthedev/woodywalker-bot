import { Client, GatewayIntentBits, Collection, Events, EmbedBuilder } from "discord.js";
import fs from "fs";
import path from "path";

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

client.once(Events.ClientReady, () => {
  console.log(`READY: ${client.user.tag}`);
});

const PREFIX = "!";

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  if (
    client.mediaOnlyChannel &&
    message.channel.id === client.mediaOnlyChannel
  ) {
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

/* ===== HOŞGELDİN SİSTEMİ ===== */

client.on(Events.GuildMemberAdd, async member => {
  const channel = member.gu
