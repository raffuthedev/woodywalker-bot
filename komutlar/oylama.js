// BU BOT SHIVADA TARAFINDAN YAZILMISTIR IZINSIZ KULLANIMDA TELİF HAKLARI UYGULANIR BILGINIZE!
import { EmbedBuilder } from "discord.js";

export default {
  name: "oylama",
  async execute(message) {
    const colors = [
      0x1abc9c,
      0x3498db,
      0x9b59b6,
      0xe91e63,
      0xf1c40f,
      0xe67e22,
      0xe74c3c
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const embed = new EmbedBuilder()
      .setTitle("Bugün Ne Oynayalım??")
      .setColor(randomColor);

    await message.channel.send({
      embeds: [embed]
    });

    const pollMessage = await message.channel.send(
`Bugün Yayında Hangi Oyunu Oynamamızı İstiyorsanız Onun Tepkimesine Tıklayabilirsiniz!

Minecraft = 👾
CS = 🔫
Pubg = ⚔️
Gartic Phone = 🖋️
Feign = 🔪

Oylama Yayın Başladığında Sona Erecektir  
Yayın Başladıktan İtibaren Oylar Sayılmayacaktır`
    );

    await pollMessage.react("👾");
    await pollMessage.react("🔫");
    await pollMessage.react("⚔️");
    await pollMessage.react("🖋️");
    await pollMessage.react("🔪");
  }
};
