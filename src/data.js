export const SIZES = [
  { id: "90x190", label: "90 × 190", factor: 1 },
  { id: "140x190", label: "140 × 190", factor: 1.055 },
  { id: "160x200", label: "160 × 200", factor: 1.091 },
  { id: "180x200", label: "180 × 200", factor: 1.183 },
];

export const FIRMNESS = [
  { id: "moelleux", label: "Moelleux" },
  { id: "equilibre", label: "Équilibré" },
  { id: "ferme", label: "Ferme" },
];

export const TECHNOLOGIES = [
  { id: "hybride", label: "Hybride" },
  { id: "mousse", label: "Mousse" },
  { id: "latex", label: "Latex" },
  { id: "ressorts", label: "Ressorts" },
];

export const products = [
  {
    id: "nuage",
    name: "Nuage Hybride",
    tag: "Coup de cœur",
    badge: "Le juste équilibre",
    tech: "hybride",
    firmness: "equilibre",
    height: "26 cm",
    support: "3/5",
    composition: "Ressorts & mémoire de forme",
    basePrice: 549,
    blurb:
      "Un accueil enveloppant, un soutien précis. Ressorts ensachés et mémoire de forme.",
    story:
      "Nuage Hybride réunit ressorts ensachés et mémoire de forme pour un accueil moelleux, sans perdre le maintien. Le juste équilibre entre douceur et soutien.",
    features: [
      {
        title: "Housse respirante",
        text: "Tissu stretch polyester, déhoussable. Une enveloppe aérée pour les nuits plus chaudes.",
      },
      {
        title: "Mémoire de forme · 4 cm",
        text: "Épouse les courbes et allège les appuis pour un accueil enveloppant.",
      },
      {
        title: "Ressorts ensachés",
        text: "Chaque ressort travaille seul. Le mouvement reste de votre côté du lit.",
      },
      {
        title: "Soutien 3/5",
        text: "Ni trop ferme, ni trop souple. Un maintien stable pour la plupart des dormeurs.",
      },
    ],
  },
  {
    id: "cocon",
    name: "Cocon Mousse",
    tag: "Douceur enveloppante",
    badge: "L'enveloppement",
    tech: "mousse",
    firmness: "moelleux",
    height: "22 cm",
    support: "2/5",
    composition: "Mémoire de forme",
    basePrice: 349,
    blurb: "Un cocon moelleux qui épouse le corps et calme les points de pression.",
    story:
      "Cocon Mousse est pensé pour celles et ceux qui aiment s'enfoncer doucement. Sa mousse à mémoire de forme répartit le poids sans effet rebond.",
    features: [
      {
        title: "Accueil moelleux",
        text: "La première couche cède juste assez pour un sentiment de cocon.",
      },
      {
        title: "Mémoire de forme · 6 cm",
        text: "Elle suit l'épaule et les hanches, puis reprend sa forme au lever.",
      },
      {
        title: "Mousse haute résilience",
        text: "Une base stable qui évite l'affaissement au centre du matelas.",
      },
      {
        title: "Housse douce",
        text: "Tissu matelassé, déhoussable et lavable à 40 °C.",
      },
    ],
  },
  {
    id: "source",
    name: "Source Latex",
    tag: "Confort naturel",
    badge: "La respiration",
    tech: "latex",
    firmness: "ferme",
    height: "24 cm",
    support: "4/5",
    composition: "Latex naturel",
    basePrice: 649,
    blurb: "Le rebond du latex naturel, aéré et durable, pour un sommeil plus franc.",
    story:
      "Source Latex s'appuie sur du latex naturel alvéolé. Il ventile, rebondit légèrement et offre un maintien plus ferme, sans la sensation de bloc.",
    features: [
      {
        title: "Latex naturel",
        text: "Une matière alvéolée qui laisse circuler l'air à travers le matelas.",
      },
      {
        title: "Maintien ferme",
        text: "Un soutien plus tonique, utile si vous dormez sur le ventre ou le dos.",
      },
      {
        title: "Indépendance de couchage",
        text: "Le latex absorbe les mouvements sans les transmettre à l'autre côté.",
      },
      {
        title: "Housse lavable",
        text: "Coutil coton, fermeture zippée, entretien simple.",
      },
    ],
  },
  {
    id: "horizon",
    name: "Horizon Ressorts",
    tag: "Soutien aéré",
    badge: "La tenue",
    tech: "ressorts",
    firmness: "equilibre",
    height: "25 cm",
    support: "4/5",
    composition: "Ressorts ensachés",
    basePrice: 449,
    blurb: "Des ressorts ensachés pour un plan de couchage tenu et très respirant.",
    story:
      "Horizon Ressorts mise sur un cœur de ressorts ensachés et une face d'accueil équilibrée. Il convient à ceux qui veulent du maintien et de l'air.",
    features: [
      {
        title: "Ressorts ensachés",
        text: "Un soutien ciblé, zone par zone, sans effet hamac.",
      },
      {
        title: "Grande ventilation",
        text: "L'air circule entre les ressorts. Les nuits restent plus fraîches.",
      },
      {
        title: "Accueil équilibré",
        text: "Une face ni trop souple ni trop dure, stable dans le temps.",
      },
      {
        title: "Bordures renforcées",
        text: "Le pourtour tient bon pour s'asseoir et utiliser toute la surface.",
      },
    ],
  },
];

export function priceFor(product, sizeId) {
  const size = SIZES.find((item) => item.id === sizeId) || SIZES[0];
  return Math.round(product.basePrice * size.factor);
}

export function euro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function firmnessLabel(id) {
  return FIRMNESS.find((item) => item.id === id)?.label || id;
}

export function techLabel(id) {
  return TECHNOLOGIES.find((item) => item.id === id)?.label || id;
}

export function sizeLabel(id) {
  return SIZES.find((item) => item.id === id)?.label || id;
}

export function getProduct(id) {
  return products.find((product) => product.id === id);
}
