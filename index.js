const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();
const PORT = process.env.PORT || 3000;

// * Cliente de WhatsApp con sesión local (persistente)
const client = new Client({
  authStrategy: new LocalAuth({ clientId: process.env.SESSION_NAME || 'default' }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // * Necesario para Railway y otros entornos cloud
  }
});

// ? Escanea QR la primera vez
client.on('qr', (qr) => {
  console.log('📱 Escanea este QR para iniciar sesión:');
  qrcode.generate(qr, { small: true });
});

// * Bot listo
client.on('ready', () => {
  console.log('✅ Bot de WhatsApp está listo');
});

// * Comando simple de prueba
client.on('message', (msg) => {
  if (msg.body.toLowerCase() === '!ping') {
    msg.reply('🏓 Pong');
  }
});

// * Inicializa el cliente
client.initialize();

// * Servidor Express para que Railway lo mantenga vivo
app.get('/', (_, res) => res.send('🤖 Bot de WhatsApp está corriendo en Railway'));
app.listen(PORT, () => {
  console.log(`🌐 Express activo en http://localhost:${PORT}`);
});
