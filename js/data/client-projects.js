/**
 * Données de démonstration pour la page suivi-projet.html (#35).
 *
 * ATTENTION : ceci est un PROTOTYPE statique, sans backend ni base de
 * données réelle — les codes et statuts sont stockés en clair dans ce
 * fichier JS, visible par n'importe qui. Ne JAMAIS y placer de vraies
 * informations client tant qu'un vrai backend sécurisé (authentification,
 * base de données côté serveur) n'a pas été mis en place. Cette page sert
 * à valider l'expérience utilisateur avant d'investir dans le développement
 * du vrai espace client.
 */
window.WSHOP_CLIENT_PROJECTS = [
  {
    code: 'DEMO2025',
    clientName: 'Client de démonstration',
    projectName: 'Site vitrine — exemple',
    steps: [
      { label: 'Devis accepté & acompte reçu', done: true },
      { label: 'Maquette validée', done: true },
      { label: 'Développement en cours', done: true, current: true },
      { label: 'Tests & relecture client', done: false },
      { label: 'Mise en ligne', done: false }
    ],
    nextMilestone: 'Envoi de la première version pour relecture — semaine du 6 octobre.'
  }
];
