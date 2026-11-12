// ============================================================
//  La Java Festival — Jeu de données de test (front-end)
//  SAÉ S3 — Groupe 6
// ============================================================

// ---------- Festival ----------
let festival = {
  _id: "festival-2027",
  name: "La Java Festival",
  edition: 2027,
  description:
    "Java'Fest extends kiff !",
  startDate: "2027-07-08",
  endDate: "2027-07-11",
  openingHours: { open: "12:00", close: "03:00" },
  address: "Site de la Java, 33128 Miami",
  contactEmail: "contact@lajavafestival.fr",
  mapFile: "plan-festival.svg",
  // Dimensions du plan SVG : les coordonnées des emplacements sont dans ce repère
  mapViewBox: { width: 1000, height: 600 },
};

// ---------- Utilisateurs ----------
// role : "public" | "prestataire" | "admin/organisateur"
// Un prestataire est lié à sa fiche (providerId), le public et l'organisateur n'en ont pas.
let users = [
  { _id: "u-admin", name: "admin", login: "admin", password: "admin", email: "admin@lajavafestival.fr", role: "admin", providerId: null },

  { _id: "u-lucas", name: "Lucas Frichet", login: "luluf", password: "lucas1234", email: "lucas.frichet@example.org", role: "public", providerId: null },
  { _id: "u-damien", name: "Damien Lugbull", login: "dadal", password: "damien12345", email: "damien.lugbull@example.org", role: "public", providerId: null },
  { _id: "u-client", name: "Client 1", login: "client1", password: "client1", email: "client1@example.org", role: "public", providerId: null },

  { _id: "u-saucegod", name: "Saucegod", login: "saucegod", password: "saucegod1234", email: "booking@csaucegod.fr", role: "prestataire", providerId: "p-saucegod" },
  { _id: "u-ezymna", name: "DJ Ezymna", login: "Ezymna", password: "Ezymna1234", email: "contact@ezymna.fr", role: "prestataire", providerId: "p-ezymna" },
  { _id: "u-maya", name: "Maya Lune", login: "mayalune", password: "maya1234", email: "maya@mayalune.fr", role: "prestataire", providerId: "p-maya" },
  { _id: "u-brass", name: "Brass Bandits", login: "brassbandits", password: "brass1234", email: "hello@brassbandits.fr", role: "prestataire", providerId: "p-brass" },
  { _id: "u-camionbleu", name: "Le Camion Bleu", login: "camionbleu", password: "bleu1234", email: "commande@camionbleu.fr", role: "prestataire", providerId: "p-camionbleu" },
  { _id: "u-crepes", name: "Crêpes & Co", login: "crepesco", password: "crepes1234", email: "contact@crepesco.fr", role: "prestataire", providerId: "p-crepes" },
  { _id: "u-merch", name: "Java Merch Officiel", login: "javamerch", password: "merch1234", email: "boutique@lajavafestival.fr", role: "prestataire", providerId: "p-merch" },
  { _id: "u-atelier", name: "Atelier Bois & Fil", login: "atelier", password: "atelier1234", email: "atelier@boisetfil.fr", role: "prestataire", providerId: "p-atelier" },
  { _id: "u-radio", name: "Radio Miami FM", login: "radioMiami", password: "radio1234", email: "partenariats@radiomiami.fr", role: "prestataire", providerId: "p-radio" },
];

// ---------- Emplacements du plan interactif ----------
// type : "scene" | "restauration" | "marchand" | "partenaire" | "bar" | "technique"
// x, y, width, height : position et taille sur le plan SVG (viewBox 1000 x 600)
// providerId : prestataire actuellement affecté (null si emplacement libre ou technique)
let locations = [
  // Scènes
  { _id: "l-scene-principale", name: "Scène principale", type: "scene", x: 380, y: 40, width: 240, height: 110, areaM2: 400, water: false, electricity: true, providerId: null, capacity: 5000 },
  { _id: "l-scene-secondaire", name: "Scène secondaire", type: "scene", x: 60, y: 180, width: 170, height: 90, areaM2: 220, water: false, electricity: true, providerId: null, capacity: 1500 },
  { _id: "l-scene-decouverte", name: "Scène découverte", type: "scene", x: 770, y: 180, width: 150, height: 80, areaM2: 120, water: false, electricity: true, providerId: null, capacity: 600 },

  // Zone de restauration
  { _id: "l-resto-1", name: "Stand restauration 1", type: "restauration", x: 300, y: 330, width: 70, height: 50, areaM2: 20, water: true, electricity: true, providerId: "p-camionbleu" },
  { _id: "l-resto-2", name: "Stand restauration 2", type: "restauration", x: 390, y: 330, width: 70, height: 50, areaM2: 15, water: true, electricity: true, providerId: "p-crepes" },
  { _id: "l-resto-3", name: "Stand restauration 3", type: "restauration", x: 480, y: 330, width: 70, height: 50, areaM2: 15, water: true, electricity: true, providerId: null },

  // Zone marchande
  { _id: "l-merch-1", name: "Stand merch 1", type: "marchand", x: 640, y: 330, width: 60, height: 45, areaM2: 9, water: false, electricity: true, providerId: "p-merch" },
  { _id: "l-merch-2", name: "Stand artisanat", type: "marchand", x: 710, y: 330, width: 60, height: 45, areaM2: 9, water: false, electricity: true, providerId: "p-atelier" },

  // Partenaires
  { _id: "l-partenaire-1", name: "Stand partenaire 1", type: "partenaire", x: 640, y: 400, width: 80, height: 50, areaM2: 16, water: false, electricity: true, providerId: "p-radio" },

  // Bars
  { _id: "l-bar-1", name: "Buvette centrale", type: "bar", x: 460, y: 220, width: 90, height: 45, areaM2: 25, water: true, electricity: true, providerId: null },
  { _id: "l-bar-2", name: "Bar de la scène secondaire", type: "bar", x: 110, y: 290, width: 70, height: 40, areaM2: 15, water: true, electricity: true, providerId: null },

  // Zones techniques et logistiques
  { _id: "l-entree", name: "Entrée principale", type: "technique", x: 440, y: 540, width: 120, height: 40, areaM2: 60, water: false, electricity: true, providerId: null },
  { _id: "l-sanitaires", name: "Sanitaires", type: "technique", x: 880, y: 330, width: 70, height: 60, areaM2: 30, water: true, electricity: true, providerId: null },
  { _id: "l-info", name: "Stand info / point de rencontre", type: "technique", x: 420, y: 470, width: 80, height: 40, areaM2: 12, water: false, electricity: true, providerId: null },
];

// ---------- Prestataires ----------
// type : "artiste" | "restauration" | "marchand" | "partenaire"
// needs : besoins logistiques (section 3 du document de cadrage)
// services : services web activés par le prestataire
let providers = [
  // Artistes / groupes
  {
    _id: "p-saucegod", type: "artiste", name: "Saucegod", genre: "Rap",
    description: "le nain le plus grand de France",
    image: "img/artistes/saucegod.jpg", website: "https://example.org/saucegod",
    locationId: null, ownerId: "u-saucegod",
    needs: { stage: true, sound: true, electricity: true, backstage: true },
    services: ["planning", "livre-or"],
  },
  {
    _id: "p-ezymna", type: "artiste", name: "DJ Ezymna", genre: "Électro",
    description: "Sets électro et house, ambiance garantie jusqu'au bout de la nuit.",
    image: "img/artistes/dj-nova.jpg", website: "https://example.org/djezymna",
    locationId: null, ownerId: "u-ezymna",
    needs: { stage: true, sound: true, electricity: true, backstage: true },
    services: ["planning", "livre-or"],
  },
  {
    _id: "p-maya", type: "artiste", name: "Maya Lune", genre: "Folk / Pop",
    description: "Voix douce et guitare acoustique, des textes poétiques en français.",
    image: "img/artistes/maya-lune.jpg", website: "https://example.org/mayalune",
    locationId: null, ownerId: "u-maya",
    needs: { stage: true, sound: true, electricity: true, backstage: true },
    services: ["planning", "livre-or"],
  },
  {
    _id: "p-brass", type: "artiste", name: "Brass Bandits", genre: "Funk",
    description: "Fanfare funk de huit musiciens, cuivres et groove.",
    image: "img/artistes/brass-bandits.jpg", website: "https://example.org/brassbandits",
    locationId: null, ownerId: "u-brass",
    needs: { stage: true, sound: true, electricity: true, backstage: true },
    services: ["planning", "livre-or"],
  },

  // Restauration
  {
    _id: "p-camionbleu", type: "restauration", name: "Le Camion Bleu", genre: "Burgers et frites",
    description: "Food truck de burgers maison, viande locale et option végétarienne.",
    image: "img/stands/camion-bleu.jpg", website: "https://example.org/camionbleu",
    locationId: "l-resto-1", ownerId: "u-camionbleu",
    needs: { water: true, electricity: true, minAreaM2: 20, gabarit: "camion", wasteNearby: true },
    services: ["reservation-repas", "comptage", "contact"],
  },
  {
    _id: "p-crepes", type: "restauration", name: "Crêpes & Co", genre: "Crêperie sucrée / salée",
    description: "Crêpes et galettes préparées à la minute.",
    image: "img/stands/crepes-co.jpg", website: "https://example.org/crepesco",
    locationId: "l-resto-2", ownerId: "u-crepes",
    needs: { water: true, electricity: true, minAreaM2: 15, gabarit: "stand fixe", wasteNearby: true },
    services: ["reservation-repas", "comptage"],
  },

  // Marchands
  {
    _id: "p-merch", type: "marchand", name: "Java Merch Officiel", genre: "Produits dérivés",
    description: "T-shirts, affiches et goodies officiels du festival.",
    image: "img/stands/java-merch.jpg", website: "https://example.org/javamerch",
    locationId: "l-merch-1", ownerId: "u-merch",
    needs: { tables: true, electricity: true, minAreaM2: 9, nearStages: true },
    services: ["boutique", "comptage", "contact"],
  },
  {
    _id: "p-atelier", type: "marchand", name: "Atelier Bois & Fil", genre: "Artisanat",
    description: "Bijoux en bois, tote bags brodés et objets faits main.",
    image: "img/stands/atelier-bois-fil.jpg", website: "https://example.org/boisetfil",
    locationId: "l-merch-2", ownerId: "u-atelier",
    needs: { tables: true, electricity: true, minAreaM2: 9, nearStages: false },
    services: ["comptage", "contact"],
  },

  // Partenaires / sponsors
  {
    _id: "p-radio", type: "partenaire", name: "Radio Miami FM", genre: "Média partenaire",
    description: "Radio locale partenaire : jeux, goodies et interviews en direct.",
    image: "img/stands/radio-miami.jpg", website: "https://example.org/radiomiami",
    locationId: "l-partenaire-1", ownerId: "u-radio",
    needs: { visible: true, electricity: true, minAreaM2: 16 },
    services: ["contact", "comptage"],
  },
];

// ---------- Créneaux de passage des artistes ----------
// locationId doit être un emplacement de type "scene"
let performances = [
  // Vendredi 9 juillet
  { _id: "perf-1", artistId: "p-maya", locationId: "l-scene-decouverte", start: "2027-07-09T17:00:00+02:00", end: "2027-07-09T18:00:00+02:00" },
  { _id: "perf-2", artistId: "p-saucegod", locationId: "l-scene-principale", start: "2027-07-09T20:00:00+02:00", end: "2027-07-09T21:30:00+02:00" },
  { _id: "perf-3", artistId: "p-ezymna", locationId: "l-scene-secondaire", start: "2027-07-09T22:30:00+02:00", end: "2027-07-10T00:00:00+02:00" },

  // Samedi 10 juillet
  { _id: "perf-4", artistId: "p-brass", locationId: "l-scene-principale", start: "2027-07-10T18:00:00+02:00", end: "2027-07-10T19:15:00+02:00" },
  { _id: "perf-5", artistId: "p-maya", locationId: "l-scene-secondaire", start: "2027-07-10T20:00:00+02:00", end: "2027-₀7-1₀T21:₀₀:₀₀+₀₂:₀₀" },
  { _id: "perf-6", artistId: "p-ezymna", locationId: "l-scene-principale", start: "2０２７-０７-１０T２２:００:００+０２:００", end: "２０２７-０７-１０T２３:３０:００+０２:００" },

  // Dimanche 11 juillet
  { _id: "perf-7", artistId: "p-saucegod", locationId: "l-scene-secondaire", start: "2027-07-11T16:00:00+02:00", end: "2027-07-11T17:00:00+02:00" },
  { _id: "perf-8", artistId: "p-brass", locationId: "l-scene-principale", start: "2027-07-11T20:30:00+02:00", end: "2027-07-11T22:00:00+02:00" },
];

// ---------- Billetterie ----------
// scope : "1-jour" (valable pour un jour précis, choisi à l'achat), "2-jours", "3-jours", "4-jours"
let ticketTypes = [
  { _id: "tt-1jour", code: "PASS1J", name: "Pass 1 jour", scope: "1-jour",day:null , price: 90, quantityTotal: 3000, quantityLeft: 2, description: "Accès au festival pour la journée de votre choix." },
  { _id: "tt-2jours", code: "PASS2J", name: "Pass 2 jours", scope: "2-jours", day: ["2027-07-9", "2027-07-10"] , price: 120 , quantityTotal: 3000, quantityLeft: 297, description: "Accès aux deux jours, du festival" },
  { _id: "tt-3jours", code: "PASS3J", name: "Pass 3 jours", scope: "3-jours", day: ["2027-07-9", "2027-07-11"] , price: 180, quantityTotal: 2000, quantityLeft: 1050, description: "Accès aux trois jours du festival." },
  { _id: "tt-4jours", code: "PASS4J", name: "Pass 4 jours", scope: "4-jours", day: ["2027-07-8", "2027-07-11"] , price: 220, quantityTotal: 1000, quantityLeft: 554, description: "Accès aux quatre jours du festival." },
];

// day : date du pass 1 jour, null pour les pass 3 jours et VIP
// qrCode : contenu encodé dans le QR code (à transformer en image côté front)
let tickets = [
  { _id: "t-0001", ticketTypeId: "tt-3jours", userId: "u-lucas", holderName: "Lucas Frichet", holderEmail: "lucas.frichet@example.org", day: null, qrCode: "LJF2027-PASS3J-0001-A7F3K9", purchaseDate: "2027-03-14T10:22:00+01:00", used: false },
  { _id: "t-0002", ticketTypeId: "tt-2jours", userId: "u-damien", holderName: "Damien Lugbull", holderEmail: "damien.lugbull@example.org", day: ["2027-07-10", "2027-07-11"], qrCode: "LJF2027-VIP-0002-M2P8Q1", purchaseDate: "2027-03-14T10:22:00+01:00", used: false },
  { _id: "t-0003", ticketTypeId: "tt-1jour", userId: "u-client", holderName: "client1", holderEmail: "client1@example.org", day: "2027-07-10", qrCode: "LJF2027-PASS1J-0003-X5D2L7", purchaseDate: "2027-04-02T18:45:00+02:00", used: false },
  { _id: "t-0004", ticketTypeId: "tt-4joursjour", userId: "u-lucas", holderName: "Chloé Petit", holderEmail: "chloe.petit@example.org", day: "2027-07-09", qrCode: "LJF2027-PASS1J-0004-B9R4T6", purchaseDate: "2027-04-20T09:05:00+02:00", used: false },
  { _id: "t-0005", ticketTypeId: "tt-1jour", userId: "u-damien", holderName: "Chloé Petit", holderEmail: "chloe.petit@example.org", day: "2027-07-11", qrCode: "LJF2027-PASS1J-0005-H1W8Z3", purchaseDate: "2027-04-20T09:05:00+02:00", used: false },
  { _id: "t-0006", ticketTypeId: "tt-3jours", userId: "u-client", holderName: "Bob Durand", holderEmail: "bob.durand@example.org", day: null, qrCode: "LJF2027-PASS3J-0006-C6N2V5", purchaseDate: "2027-05-01T20:10:00+02:00", used: false },
];

// ---------- Réservation de repas ----------
// Plats proposés par les stands de restauration
let meals = [
  { _id: "m-burger", providerId: "p-camionbleu", name: "Burger classique", description: "Boeuf local, cheddar, salade, sauce maison, frites.", price: 11, vegetarian: false, allergens: ["gluten", "lait"] },
  { _id: "m-burger-veggie", providerId: "p-camionbleu", name: "Burger végétarien", description: "Galette de pois chiches, légumes grillés, frites.", price: 10, vegetarian: true, allergens: ["gluten"] },
  { _id: "m-frites", providerId: "p-camionbleu", name: "Portion de frites", description: "Frites fraîches, sauce au choix.", price: 4, vegetarian: true, allergens: [] },
  { _id: "m-galette", providerId: "p-crepes", name: "Galette complète", description: "Jambon, fromage, oeuf.", price: 8, vegetarian: false, allergens: ["gluten", "oeuf", "lait"] },
  { _id: "m-crepe-sucre", providerId: "p-crepes", name: "Crêpe sucre-citron", description: "Crêpe fine, sucre et citron.", price: 4, vegetarian: true, allergens: ["gluten", "oeuf", "lait"] },
  { _id: "m-crepe-choco", providerId: "p-crepes", name: "Crêpe chocolat-banane", description: "Crêpe, chocolat fondu et banane.", price: 5.5, vegetarian: true, allergens: ["gluten", "oeuf", "lait"] },
];

// Créneaux de retrait/repas ; seatsLeft = nombre de couverts restants
let mealSlots = [
  { _id: "ms-1", providerId: "p-camionbleu", start: "2027-07-10T19:00:00+02:00", end: "2027-07-10T19:30:00+02:00", seatsTotal: 40, seatsLeft: 37 },
  { _id: "ms-2", providerId: "p-camionbleu", start: "2027-07-10T19:30:00+02:00", end: "2027-07-10T20:00:00+02:00", seatsTotal: 40, seatsLeft: 40 },
  { _id: "ms-3", providerId: "p-camionbleu", start: "2027-07-11T19:00:00+02:00", end: "2027-07-11T19:30:00+02:00", seatsTotal: 40, seatsLeft: 40 },
  { _id: "ms-4", providerId: "p-crepes", start: "2027-07-10T18:00:00+02:00", end: "2027-07-10T18:30:00+02:00", seatsTotal: 30, seatsLeft: 28 },
  { _id: "ms-5", providerId: "p-crepes", start: "2027-07-11T17:00:00+02:00", end: "2027-07-11T17:30:00+02:00", seatsTotal: 30, seatsLeft: 30 },
];

let mealReservations = [
  { _id: "mr-1", userId: "u-lucas", slotId: "ms-1", items: [{ mealId: "m-burger", quantity: 2 }, { mealId: "m-frites", quantity: 1 }], total: 26, status: "confirmee", date: "2027-06-20T12:30:00+02:00" },
  { _id: "mr-2", userId: "u-damien", slotId: "ms-1", items: [{ mealId: "m-burger-veggie", quantity: 1 }], total: 10, status: "confirmee", date: "2027-06-21T08:15:00+02:00" },
  { _id: "mr-3", userId: "u-client", slotId: "ms-4", items: [{ mealId: "m-galette", quantity: 1 }, { mealId: "m-crepe-choco", quantity: 1 }], total: 13.5, status: "confirmee", date: "2027-06-22T19:40:00+02:00" },
];

// ---------- Boutique merch ----------
// category : "t-shirt" | "affiche" | "goodies"
let merchItems = [
  { _id: "mi-tshirt-noir", name: "T-shirt Java Festival noir", category: "t-shirt", description: "T-shirt 100 % coton bio, logo du festival.", price: 25, image: "img/merch/tshirt-noir.jpg", sizes: ["S", "M", "L", "XL"], colors: ["noir"], stock: 120 },
  { _id: "mi-tshirt-blanc", name: "T-shirt Java Festival blanc", category: "t-shirt", description: "T-shirt 100 % coton bio, impression dos line-up.", price: 25, image: "img/merch/tshirt-blanc.jpg", sizes: ["S", "M", "L", "XL"], colors: ["blanc"], stock: 80 },
  { _id: "mi-affiche", name: "Affiche officielle 2027", category: "affiche", description: "Affiche A2 sur papier épais, tirage limité.", price: 12, image: "img/merch/affiche-2027.jpg", sizes: [], colors: [], stock: 150 },
  { _id: "mi-totebag", name: "Tote bag Java", category: "goodies", description: "Sac en toile résistant.", price: 9, image: "img/merch/totebag.jpg", sizes: [], colors: ["écru", "noir"], stock: 200 },
  { _id: "mi-gourde", name: "Gourde Java 50 cl", category: "goodies", description: "Gourde réutilisable inox, sans plastique.", price: 15, image: "img/merch/gourde.jpg", sizes: [], colors: ["argent"], stock: 60 },
  { _id: "mi-bouchons", name: "Bouchons d'oreilles festival", category: "goodies", description: "Protections auditives réutilisables avec étui.", price: 6, image: "img/merch/bouchons.jpg", sizes: [], colors: [], stock: 0 },
];

// status : "precommandee" | "retiree" | "annulee"  (retrait sur place)
let merchOrders = [
  { _id: "mo-1", userId: "u-lucas", items: [{ itemId: "mi-tshirt-noir", size: "M", color: "noir", quantity: 1, unitPrice: 25 }, { itemId: "mi-affiche", size: null, color: null, quantity: 2, unitPrice: 12 }], total: 49, status: "precommandee", date: "2027-05-10T21:03:00+02:00" },
  { _id: "mo-2", userId: "u-damien", items: [{ itemId: "mi-gourde", size: null, color: "argent", quantity: 1, unitPrice: 15 }, { itemId: "mi-totebag", size: null, color: "noir", quantity: 1, unitPrice: 9 }], total: 24, status: "precommandee", date: "2027-05-12T14:30:00+02:00" },
  { _id: "mo-3", userId: "u-client", items: [{ itemId: "mi-tshirt-blanc", size: "S", color: "blanc", quantity: 2, unitPrice: 25 }], total: 50, status: "precommandee", date: "2027-05-15T18:55:00+02:00" },
  { _id: "mo-4", userId: "u-client", items: [{ itemId: "mi-totebag", size: null, color: "écru", quantity: 3, unitPrice: 9 }], total: 27, status: "precommandee", date: "2027-05-18T11:20:00+02:00" },
];

// ---------- Livre d'or des artistes ----------
let guestbookMessages = [
  { _id: "gb-1", artistId: "p-saucegod", pseudo: "RockFan25", message: "Hâte de vous revoir sur scène, votre dernier concert était incroyable !", date: "2027-05-02T19:12:00+02:00" },
  { _id: "gb-2", artistId: "p-saucegod", pseudo: "Lucas", message: "Jouez Tempête en ouverture s'il vous plaît !", date: "2027-05-04T08:40:00+02:00" },
  { _id: "gb-3", artistId: "p-", pseudo: "Bob", message: "Le set de l'an dernier était dingue, vivement vendredi soir.", date: "2027-05-06T23:01:00+02:00" },
  { _id: "gb-4", artistId: "p-maya", pseudo: "Chloé", message: "Votre voix est magnifique, on a hâte de vous écouter en live.", date: "2027-05-08T16:25:00+02:00" },
  { _id: "gb-5", artistId: "p-brass", pseudo: "FunkyFred", message: "Des cuivres, du groove et du soleil : le combo parfait !", date: "2027-05-09T12:00:00+02:00" },
];

// ---------- Planning personnel (public authentifié) ----------
let personalPlannings = [
  { _id: "pl-lucas", userId: "u-lucas", performanceIds: ["perf-2", "perf-4", "perf-8"] },
  { _id: "pl-damien", userId: "u-damien", performanceIds: ["perf-5", "perf-6"] },
  { _id: "pl-client", userId: "u-client", performanceIds: ["perf-1", "perf-7"] },
];

// ---------- Notifications de changement d'horaire ----------
let notifications = [
  { _id: "n-1", userId: "u-lucas", performanceId: "perf-4", message: "Le concert de Brass Bandits (samedi) est avancé de 17h30 à 18h00.", date: "2027-06-25T10:00:00+02:00", read: false },
  { _id: "n-2", userId: "u-damien", performanceId: "perf-5", message: "Maya Lune jouera finalement sur la scène secondaire, samedi à 20h00.", date: "2027-06-26T09:30:00+02:00", read: true },
];

// ---------- Formulaire de contact vers un prestataire ----------
let contactMessages = [
  { _id: "c-1", providerId: "p-radio", senderName: "Alice Martin", senderEmail: "alice.martin@example.org", subject: "Jeux concours", message: "Bonjour, y aura-t-il un jeu concours pour gagner des places l'an prochain ?", date: "2027-06-15T11:45:00+02:00", read: false },
  { _id: "c-2", providerId: "p-camionbleu", senderName: "Bob Durand", senderEmail: "bob.durand@example.org", subject: "Allergies", message: "Vos frites sont-elles cuites dans une huile sans arachide ?", date: "2027-06-18T17:10:00+02:00", read: true },
  { _id: "c-3", providerId: "p-merch", senderName: "Chloé Petit", senderEmail: "chloe.petit@example.org", subject: "Tailles", message: "Les t-shirts taillent-ils grand ?", date: "2027-06-19T20:05:00+02:00", read: false },
];

// ---------- Comptage de fréquentation ----------
// Un relevé = nombre de passages devant un stand pendant une heure donnée
// (simulé côté prestataire). hour : heure de début de la tranche (0-23).
let footfallRecords = [
  // Samedi 10 juillet : Le Camion Bleu
  { _id: "ff-1", providerId: "p-camionbleu", day: "2027-07-10", hour: 17, count: 85 },
  { _id: "ff-2", providerId: "p-camionbleu", day: "2027-07-10", hour: 18, count: 140 },
  { _id: "ff-3", providerId: "p-camionbleu", day: "2027-07-10", hour: 19, count: 230 },
  { _id: "ff-4", providerId: "p-camionbleu", day: "2027-07-10", hour: 20, count: 190 },
  { _id: "ff-5", providerId: "p-camionbleu", day: "2027-07-10", hour: 21, count: 120 },
  // Samedi 10 juillet : Crêpes & Co
  { _id: "ff-6", providerId: "p-crepes", day: "2027-07-10", hour: 17, count: 60 },
  { _id: "ff-7", providerId: "p-crepes", day: "2027-07-10", hour: 18, count: 95 },
  { _id: "ff-8", providerId: "p-crepes", day: "2027-07-10", hour: 19, count: 110 },
  { _id: "ff-9", providerId: "p-crepes", day: "2027-07-10", hour: 20, count: 130 },
  { _id: "ff-10", providerId: "p-crepes", day: "2027-07-10", hour: 21, count: 150 },
  // Samedi 10 juillet : Java Merch
  { _id: "ff-11", providerId: "p-merch", day: "2027-07-10", hour: 17, count: 40 },
  { _id: "ff-12", providerId: "p-merch", day: "2027-07-10", hour: 18, count: 75 },
  { _id: "ff-13", providerId: "p-merch", day: "2027-07-10", hour: 19, count: 90 },
  { _id: "ff-14", providerId: "p-merch", day: "2027-07-10", hour: 20, count: 65 },
  // Dimanche 11 juillet : Le Camion Bleu
  { _id: "ff-15", providerId: "p-camionbleu", day: "2027-07-11", hour: 17, count: 70 },
  { _id: "ff-16", providerId: "p-camionbleu", day: "2027-07-11", hour: 18, count: 105 },
  { _id: "ff-17", providerId: "p-camionbleu", day: "2027-07-11", hour: 19, count: 160 },
];

// ---------- Sondage de satisfaction (fin de festival) ----------
// Notes de 1 à 5
let surveyResponses = [
  { _id: "sv-1", userId: "u-lucas", overallRating: 5, musicRating: 5, foodRating: 4, organisationRating: 5, comment: "Super week-end, merci à toute l'équipe !", date: "2027-07-12T10:00:00+02:00" },
  { _id: "sv-2", userId: "u-damien", overallRating: 4, musicRating: 5, foodRating: 3, organisationRating: 4, comment: "Un peu d'attente aux stands de restauration, sinon top.", date: "2027-07-12T11:20:00+02:00" },
  { _id: "sv-3", userId: "u-client", overallRating: 5, musicRating: 4, foodRating: 5, organisationRating: 5, comment: "", date: "2027-07-12T15:45:00+02:00" },
];

export {
  festival,
  users,
  locations,
  providers,
  performances,
  ticketTypes,
  tickets,
  meals,
  mealSlots,
  mealReservations,
  merchItems,
  merchOrders,
  guestbookMessages,
  personalPlannings,
  notifications,
  contactMessages,
  footfallRecords,
  surveyResponses,
};