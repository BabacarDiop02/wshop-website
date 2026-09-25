/**
 * Témoignages clients affichés dans la section "Pourquoi nous faire confiance".
 *
 * IMPORTANT : ce tableau reste vide tant qu'aucun avis client réel n'a été
 * recueilli — on n'invente jamais de faux témoignages. Dès qu'un client
 * accepte de laisser un avis, ajoutez un objet ici avec ses vraies
 * coordonnées ; la section l'affichera automatiquement et masquera le
 * message "à venir".
 *
 * Format attendu :
 * {
 *   name: 'Prénom Nom',
 *   role: 'Fonction, Entreprise',
 *   quote: 'Le témoignage complet.',
 *   rating: 5, // sur 5
 *   avatarInitials: 'PN' // à défaut de photo
 * }
 */
window.WSHOP_TESTIMONIALS = [];

/**
 * Logos clients à afficher (bandeau de confiance). Même principe : vide par
 * défaut, à compléter uniquement avec l'accord explicite du client.
 * Format : { name: 'Nom de l'entreprise', logo: 'images/clients/xxx.webp', url: '' }
 */
window.WSHOP_CLIENT_LOGOS = [];
