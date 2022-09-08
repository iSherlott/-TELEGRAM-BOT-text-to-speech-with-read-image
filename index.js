process.env.NTBA_FIX_319 = 1;
process.env.NTBA_FIX_350 = 1;

const TelegramBot = require("node-telegram-bot-api");
const { token } = require("./config/config.json");
const bot = new TelegramBot(token, { polling: true });

const readMessage = require("./helpers/readMessage")
const google_translate = require("./helpers/google_translate")
const genTSS = require("./helpers/genTSS")

const fs = require("fs")

bot.on("message", async(msg) => {
  if (msg.text == "/start")
    return bot.sendMessage(
      msg.chat.id,
      "Olá! Seja bem vindo a AishaBot, favor escreva o texto ou envie a imagem que irei transcreve-lo para inglês."
    );

  const text = await readMessage(bot, msg)
  if(!text["status"]) return bot.sendMessage(msg.chat.id, `Seu texto não pode ser processado.`)

  const translate = await google_translate(text["data"])
  if(!translate["status"]) return bot.sendMessage(msg.chat.id, `Não foi possivel traduzir o seu texto.`)

  const message = translate["data"].replace(/&#39;/g, "'");

  await bot.sendMessage(
    msg.chat.id,
    `Texto: \n${text["data"]} \n\n\nTradução para Inglês: \n${message}`
  );
  genTSS(message)

  setTimeout(() => bot.sendAudio(msg.chat.id, "audio.mp3").then(() => fs.unlinkSync("audio.mp3")), 5000)
});
