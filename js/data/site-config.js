/**
 * Configuration centrale du site Wshop.
 * Toutes les fonctionnalités qui dépendent d'un compte tiers sont désactivées
 * par défaut (valeur vide ou false) : elles s'activent d'elles-mêmes dès que
 * vous renseignez la valeur correspondante, sans toucher au reste du code.
 */
window.WSHOP_CONFIG = {
  whatsappNumber: '221776947150',
  contactEmail: 'babacardiop1998@gmail.com',

  // Disponibilité affichée dans le badge flottant / hero.
  // 'disponible' | 'limitee' | 'complet'
  availability: 'disponible',
  availabilityNote: 'Nouveaux projets acceptés — démarrage sous 1 à 2 semaines',

  // Prise de rendez-vous (#20). Laissez vide pour afficher un simple lien
  // WhatsApp à la place de l'agenda intégré.
  // Exemple : 'https://calendly.com/votre-compte/appel-decouverte'
  calendlyUrl: '',

  // Formulaire de contact (#31). Laissez emailjsServiceId vide pour garder
  // le comportement actuel (ouverture WhatsApp / mailto). Renseignez ces
  // 3 valeurs (créées gratuitement sur emailjs.com) pour activer l'envoi
  // direct + accusé de réception automatique.
  emailjs: {
    publicKey: '',
    serviceId: '',
    templateId: ''
  },

  // Newsletter (#32). Laissez vide : les emails sont alors simplement
  // enregistrés localement (voir js/modules/newsletter.js) et un export est
  // proposé. Renseignez un endpoint (Mailchimp, Brevo, Formspree...) pour
  // les envoyer directement à votre outil d'emailing.
  newsletterEndpoint: '',

  // Analytics respectueux de la vie privée (#33), désactivé par défaut.
  // Renseignez votre domaine Plausible (ex: 'wshop.sn') pour l'activer.
  plausibleDomain: '',

  // Réseaux sociaux
  social: {
    github: 'https://github.com/BabacarDiop02',
    gitlab: 'https://gitlab.com/babacardiop1998',
    portfolio: 'https://portfolio-babacar-diop.vercel.app/'
  }
};
