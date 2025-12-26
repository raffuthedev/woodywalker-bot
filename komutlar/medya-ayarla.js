export default {
  name: "medya-ayarla",
  async execute(message) {
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("Bu komutu kullanamazsın.");
    }

    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply("Bir kanal etiketle.");
    }

    message.client.mediaOnlyChannel = channel.id;

    message.reply(`Medya kanalı ayarlandı: ${channel}`);
  }
};
