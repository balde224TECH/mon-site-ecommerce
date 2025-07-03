// Importations en premier
const express = require('express');
const path = require('path');
require('dotenv').config();

// Initialisation de l'app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route API Contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Ici ajouter la logique d'envoi à Telegram
    console.log(`Message reçu de ${name} (${email}): ${message}`);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Échec du traitement' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
