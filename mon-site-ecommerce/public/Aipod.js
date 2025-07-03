
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.comment-section form');
    
    // Gérer le clic sur les boutons "Commander"
    document.querySelectorAll('.command-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.productId;
            const productName = productCard.dataset.productName;
            
            // Pré-remplir le formulaire
            document.getElementById('productName').value = productName;
            document.getElementById('productID').value = productId;
            
            // Scroll vers le formulaire
            document.getElementById('contact-form').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Focus sur le champ suivant
            document.getElementById('customerNumber').focus();
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const productName = document.getElementById('productName').value;
        const whatsappNumber = document.getElementById('whatsappNumber').value;
        const productID = document.getElementById('productID').value;
        const customerNumber = document.getElementById('customerNumber').value;
        const comment = document.getElementById('comment').value;
        
        // Vérifier que tous les champs sont remplis
        if (!productName || !whatsappNumber || !productID || !customerNumber) {
            alert('Veuillez remplir tous les champs obligatoires du formulaire.');
            return;
        }
        
        // Configuration du bot Telegram
        const botToken = '7738217538:AAHYGV5jXPv5L37QmHsJ7PbnBz8UhXYof2k';
        const chatId = '6804915795';
        
        // Créer le message à envoyer avec le numéro WhatsApp
        const message = `🛍 Nouvelle commande:\n\n` +
                     `📦 Produit: ${productName}\n` +
                     `🔖 ID: ${productID}\n` +
                     `📱 Téléphone: ${customerNumber}\n` +
                     `📲 WhatsApp: ${whatsappNumber}\n` +
                     `💬 Message: ${comment || 'Aucun message supplémentaire'}`;
        
        // Encoder le message pour l'URL
        const encodedMessage = encodeURIComponent(message);
        
        // Afficher un indicateur de chargement
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Envoyer le message via l'API Telegram
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodedMessage}`)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    // Créer et afficher une alerte stylée
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-success alert-dismissible fade show';
                    alertDiv.style.position = 'fixed';
                    alertDiv.style.top = '20px';
                    alertDiv.style.right = '20px';
                    alertDiv.style.zIndex = '1000';
                    alertDiv.style.maxWidth = '350px';
                    alertDiv.innerHTML = `
                        <i class="fas fa-check-circle me-2"></i>
                        <strong>Commande envoyée!</strong> Nous vous contacterons bientôt.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    `;
                    document.body.appendChild(alertDiv);
                    
                    // Fermer automatiquement après 5 secondes
                    setTimeout(() => {
                        alertDiv.classList.remove('show');
                        setTimeout(() => alertDiv.remove(), 150);
                    }, 5000);
                    
                    form.reset();
                } else {
                    alert('Une erreur est survenue. Veuillez réessayer plus tard.');
                    console.error('Erreur Telegram:', data);
                }
            })
            .catch(error => {
                alert('Une erreur réseau est survenue. Veuillez vérifier votre connexion et réessayer.');
                console.error('Erreur:', error);
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
});
