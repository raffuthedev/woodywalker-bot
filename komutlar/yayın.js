import { EmbedBuilder } from "discord.js";

export default {
  name: "yayın",
  async execute(message) {
    await message.delete().catch(() => {});

    const embed = new EmbedBuilder()
      .setTitle("WoodyWalker - Yayın Başlıyor")
      .setDescription(
`🚨 **YAYINDAYIZ!** 🚨

Kick yayınına başladık!
Bugün yayında bol muhabbet, oyun ve sürprizler var 👀🎉

🎁 **ÇEKİLİŞ VAR!**
➡️ Random Steam kodu
➡️ Yayın sırasında çeşitli oyunlar oynanacak

Katıl, sohbet et, şansını dene 💚  
Kaçıran üzülür 👇

https://kick.com/xwoodywalker`
      )
      .setColor(0x00ff99);

    await message.channel.send({
      content: "@everyone",
      embeds: [embed]
    });
  }
};
