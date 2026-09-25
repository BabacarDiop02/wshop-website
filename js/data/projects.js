/**
 * Données des réalisations Wshop.
 * Source unique utilisée par la grille de la page d'accueil (#realisations)
 * et par la page de détail projet.html?slug=...
 *
 * TODO(Babacar) : remplacer les liens "Voir le code" par les dépôts exacts,
 * ajouter des captures réelles dans images/projects/ quand disponibles,
 * et compléter "results" avec des chiffres réels une fois mesurés.
 */
window.WSHOP_PROJECTS = [
  {
    slug: 'fintrack',
    title: 'FinTrack',
    category: 'mobile',
    sector: 'Finance',
    status: 'livre',
    date: '2024-03',
    icon: 'ri-wallet-3-line',
    badgeLabel: 'Finance · Mobile',
    short: "Application de gestion de finances personnelles : suivi des dépenses, budgets et objectifs d'épargne. Build APK Android livré.",
    long: "FinTrack aide les particuliers à reprendre le contrôle de leur budget mensuel : saisie rapide des dépenses par catégorie, définition d'objectifs d'épargne, et visualisation de l'évolution du solde dans le temps. L'application fonctionne hors-ligne, les données étant synchronisées avec Supabase dès qu'une connexion est disponible.",
    tech: ['Flutter', 'Dart', 'Supabase'],
    images: [],
    demoUrl: '',
    githubUrl: 'https://github.com/BabacarDiop02',
    results: [
      { label: 'Plateforme', value: 'Android (APK)' },
      { label: 'Mode', value: '100 % utilisable hors-ligne' }
    ]
  },
  {
    slug: 'pharmaconnect',
    title: 'PharmaConnect',
    category: 'mobile',
    sector: 'Santé',
    status: 'livre',
    date: '2023-11',
    icon: 'ri-capsule-line',
    badgeLabel: 'Santé · Mobile',
    short: "Localisation des pharmacies et numérisation d'ordonnances à Dakar : trouver une pharmacie proche et scanner ses prescriptions.",
    long: "PharmaConnect répond à un besoin très concret à Dakar : savoir rapidement quelle pharmacie est ouverte et à proximité, notamment lors des gardes de nuit. L'application géolocalise les pharmacies, permet de numériser une ordonnance pour la conserver, et centralise l'historique des prescriptions du patient.",
    tech: ['Flutter', 'Dart'],
    images: [],
    demoUrl: '',
    githubUrl: 'https://github.com/BabacarDiop02',
    results: [
      { label: 'Fonction clé', value: 'Géolocalisation des pharmacies' },
      { label: 'Fonction clé', value: 'Numérisation d\'ordonnances' }
    ]
  },
  {
    slug: 'xam-xam',
    title: 'Xam-Xam',
    category: 'mobile',
    sector: 'Éducation',
    status: 'livre',
    date: '2024-06',
    icon: 'ri-brain-line',
    badgeLabel: 'Éducation · Jeu mobile',
    short: "Jeu de culture générale et de réflexion (« Xam-Xam » signifie « le savoir » en wolof). 100 % hors-ligne, progression par niveaux, étoiles et XP, plus de 25 types de questions.",
    long: "Xam-Xam est un jeu de culture générale pensé pour le marché sénégalais et africain : contenu 100 % hors-ligne (aucune dépendance à une connexion internet), système de progression par niveaux avec étoiles et points d'expérience, et plus de 25 types de questions différents pour garder le jeu varié. La base de données SQLite embarquée permet des temps de chargement quasi instantanés.",
    tech: ['Flutter', 'SQLite'],
    images: ['images/projects/xam-xam.webp'],
    demoUrl: '',
    githubUrl: 'https://github.com/BabacarDiop02',
    results: [
      { label: 'Types de questions', value: '25+' },
      { label: 'Connexion requise', value: 'Aucune (100 % hors-ligne)' }
    ]
  },
  {
    slug: 'task-flow',
    title: 'Task Flow',
    category: 'web',
    sector: 'Gestion',
    status: 'livre',
    date: '2023-09',
    icon: 'ri-task-line',
    badgeLabel: 'Web · Gestion',
    short: "Application de gestion de tâches et de flux de travail, avec une API robuste.",
    long: "Task Flow est une application de gestion de tâches collaborative, construite autour d'une API REST Spring Boot robuste. Elle couvre la création de tâches, leur assignation, le suivi de statut et les flux de validation, pensée pour des petites équipes ayant besoin d'un outil simple sans la complexité d'un ERP.",
    tech: ['Spring Boot', 'Java'],
    images: [],
    demoUrl: '',
    githubUrl: 'https://github.com/BabacarDiop02',
    results: [
      { label: 'Architecture', value: 'API REST Spring Boot' }
    ]
  },
  {
    slug: 'stock-manager',
    title: 'Stock Manager',
    category: 'web',
    sector: 'Gestion',
    status: 'livre',
    date: '2023-05',
    icon: 'ri-archive-line',
    badgeLabel: 'Web · Gestion',
    short: "Système de gestion de stock et d'inventaire pour commerces et entreprises.",
    long: "Stock Manager permet à un commerce de suivre ses entrées et sorties de stock, ses seuils d'alerte, et de générer un état d'inventaire à tout moment. Conçu pour rester simple d'utilisation pour des équipes non techniques.",
    tech: ['Web'],
    images: [],
    demoUrl: '',
    githubUrl: 'https://github.com/BabacarDiop02',
    results: []
  },
  {
    slug: 'gestion-courrier',
    title: 'Gestion Courrier',
    category: 'web',
    sector: 'Bureautique',
    status: 'livre',
    date: '2023-02',
    icon: 'ri-mail-send-line',
    badgeLabel: 'Web · Bureautique',
    short: "Plateforme de gestion et de suivi du courrier entrant/sortant.",
    long: "Cette plateforme numérise le registre du courrier d'une structure : enregistrement du courrier entrant et sortant, affectation à un service, suivi du statut de traitement et recherche rapide dans l'historique.",
    tech: ['Web'],
    images: [],
    demoUrl: '',
    githubUrl: 'https://github.com/BabacarDiop02',
    results: []
  },
  {
    slug: 'dsms',
    title: 'DSMS',
    category: 'web',
    sector: 'Plateforme',
    status: 'demo',
    date: '2022-12',
    icon: 'ri-database-2-line',
    badgeLabel: 'Web · Plateforme',
    // TODO(Babacar) : préciser le domaine exact de ce projet
    short: "Système de gestion (domaine à préciser).",
    long: "Système de gestion développé pour structurer et centraliser des données métiers. Description détaillée à compléter.",
    tech: ['Web'],
    images: [],
    demoUrl: '',
    githubUrl: 'https://github.com/BabacarDiop02',
    results: []
  },
  {
    slug: 'p2p-node',
    title: 'P2P Node',
    category: 'backend',
    sector: 'Réseau',
    status: 'demo',
    date: '2022-08',
    icon: 'ri-share-forward-line',
    badgeLabel: 'Backend · Réseau',
    short: "Nœud pair-à-pair et architecture distribuée.",
    long: "Implémentation d'un nœud pair-à-pair explorant les problématiques de découverte de pairs, de résilience et de communication distribuée sans serveur central.",
    tech: ['Backend'],
    images: [],
    demoUrl: '',
    githubUrl: 'https://gitlab.com/babacardiop1998',
    results: []
  },
  {
    slug: 'basketball-plateforme',
    title: 'Basketball Plateforme',
    category: 'web',
    sector: 'Sport',
    status: 'livre',
    date: '2022-04',
    icon: 'ri-basketball-line',
    badgeLabel: 'Web',
    short: "Plateforme dédiée au basketball (gestion et suivi).",
    long: "Plateforme web pour la gestion d'un club ou d'une ligue de basketball : suivi des équipes, des matchs et des statistiques de base.",
    tech: ['Web'],
    images: [],
    demoUrl: '',
    githubUrl: 'https://github.com/BabacarDiop02',
    results: []
  }
];

// Libellés d'affichage pour le statut d'un projet (voir #7 : badges honnêtes,
// on n'affirme jamais "client réel" sans confirmation).
window.WSHOP_PROJECT_STATUS_LABELS = {
  livre: { label: 'Livré', icon: 'ri-checkbox-circle-fill', className: 'bg-primary/10 text-primary' },
  demo: { label: 'Démo / prototype', icon: 'ri-flask-line', className: 'bg-gray-100 text-gray-600' },
  encours: { label: 'En cours', icon: 'ri-loader-4-line', className: 'bg-accent/10 text-accent' }
};
