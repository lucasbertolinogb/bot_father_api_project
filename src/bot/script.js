const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '6959093772:AAEs23-IlMQ-WK4ZCITlFj-d2JGTGWCYx5w';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Tudo OK');

  // Se a mensagem for "imagem"
  if (msg.text === 'imagem') {
        bot.sendMessage(chatId, 'Por favor, envie uma imagem.');
    }
});

bot.on('photo', async (msg) => {
    const chatId = msg.chat.id;
    const fileId = msg.photo[0].file_id;

    bot.downloadFile(fileId, './src/downloads')
    .then((filePath) => {
        // Faz algo com o arquivo baixado
        console.log('Imagem baixada:', filePath);
        bot.sendMessage(chatId, 'Imagem recebida e salva com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao baixar imagem:', error);
        bot.sendMessage(chatId, 'Ocorreu um erro ao baixar a imagem.');
    });
});
