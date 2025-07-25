const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const client = new Client({
    authStrategy: new LocalAuth({ clientId: process.env.SESSION_NAME || 'default' })
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot listo');
});

client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong');
    }
});

client.initialize();

app.get('/', (_, res) => res.send('Bot activo ✅'));
app.listen(PORT, () => console.log(`🌐 Express activo en http://localhost:${PORT}`));
