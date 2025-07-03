const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORRECTE des fichiers statiques
app.use(express.static(path.join(__dirname))); // Sans 'public' supplémentaire

// Route racine
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Chemin direct
});

// ... autres routes ...

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
