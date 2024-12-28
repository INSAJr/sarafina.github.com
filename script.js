document.addEventListener('DOMContentLoaded', () => {
    const cart = []; // Tableau pour stocker les articles du panier
    const cartIcon = document.getElementById('cart-icon'); // Icône du panier
    const cartModal = document.getElementById('cart-modal'); // Modale du panier
    const closeModal = document.getElementById('close-modal'); // Bouton pour fermer la modale
    const cartItems = document.getElementById('cart-items'); // Liste des articles dans la modale
    const totalPrice = document.getElementById('total-price'); // Affiche le total du panier
    const checkoutButton = document.getElementById('checkout'); // Bouton "Commander"
    const cartCount = document.getElementById('cart-count'); // Compteur du panier

    // Fonction pour mettre à jour le contenu du panier (affichage)
    function updateCart() {
        cartItems.innerHTML = ''; // Réinitialise la liste des articles affichés
        let total = 0;

        if (cart.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'Votre panier est vide.';
            emptyMessage.style.textAlign = 'center';
   emptyMessage.style.color = '#555';
            cartItems.appendChild(emptyMessage);
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.classList.add('cart-item');

                const thumbnail = document.createElement('img');
                thumbnail.src = item.image;
                thumbnail.alt = item.name;
                thumbnail.classList.add('cart-thumbnail');

                const details = document.createElement('div');
                details.classList.add('cart-details');
                details.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>${item.price * item.quantity} FCFA</span>
                `;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Supprimer';
                removeButton.classList.add('remove-item');
                removeButton.addEventListener('click', () => {
                    cart.splice(index, 1); // Supprime l'article du tableau
                    updateCart(); // Met à jour l'affichage
                    updateCartCount(); // Met à jour le compteur
                });

                li.appendChild(thumbnail);
                li.appendChild(details);
                li.appendChild(removeButton);
                cartItems.appendChild(li);

                total += item.price * item.quantity;
            });
        }

        totalPrice.textContent = `Total : ${total} FCFA`; // Met à jour le total du panier
    }

    // Fonction pour mettre à jour le compteur du panier
    function updateCartCount() {
        const itemCount = cart.reduce((count, item) => count + item.quantity, 0); // Calcule la quantité totale
        cartCount.textContent = itemCount; // Affiche le nombre d'articles dans le compteur
    }

    // Ajout d'un article au panier
    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.menu-item'); // Trouve l'élément parent
            if (!itemElement) return;

            const name = itemElement.querySelector('h4').textContent; // Nom de l'article
            const price = parseFloat(itemElement.querySelector('p').textContent.replace(' FCFA', '')); // Prix
            const image = button.getAttribute('data-image'); // Image associée

            // Vérifie si l'article existe déjà dans le panier
            const existingItem = cart.find(cartItem => cartItem.name === name);
            if (existingItem) {
                existingItem.quantity += 1; // Augmente la quantité
            } else {
                cart.push({ name, price, image, quantity: 1 }); // Ajoute un nouvel article
            }

            updateCartCount(); // Met à jour le compteur
        });
    });

    // Ouvrir la modale du panier
    cartIcon.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
        cartModal.classList.add('flex');
        updateCart(); // Met à jour l'affichage des articles
    });

    // Fermer la modale du panier
    closeModal.addEventListener('click', () => {
        cartModal.classList.remove('flex');
        cartModal.classList.add('hidden');
    });

    // Gestion de la commande
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Votre panier est vide !');
        } else {
            alert('Commande passée avec succès !');
            cart.length = 0; // Vide le panier
            updateCart(); // Met à jour l'affichage
            updateCartCount(); // Réinitialise le compteur
            window.location.href = 'payment.html'; // Redirige vers la page de paiement
        }
    });
});
