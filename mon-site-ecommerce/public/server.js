const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Routes pour chaque page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/aipod', (req, res) => {
  res.sendFile(path.join(__dirname, 'Aipod.html'));
});

app.get('/voiture', (req, res) => {
  res.sendFile(path.join(__dirname, 'voiture.html'));
});

app.get('/vetement', (req, res) => {
  res.sendFile(path.join(__dirname, 'vetement.html'));
});

app.get('/multiservices', (req, res) => {
  res.sendFile(path.join(__dirname, 'multiservices.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// API pour Telegram
app.post('/api/send-message', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await sendTelegramMessage(message);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fonction pour envoyer à Telegram (à adapter)
async function sendTelegramMessage(message) {
  // Implémentez votre logique d'envoi ici
  return { status: 'Message sent', content: message };
}

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access: http://localhost:${PORT}`);
});