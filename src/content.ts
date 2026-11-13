export const media = {
  logo: `${import.meta.env.BASE_URL}images/logo-steel.webp`,
  mural: `${import.meta.env.BASE_URL}images/mural-steel.webp`,
  gymFloor: `${import.meta.env.BASE_URL}images/salao-steel.webp`,
  freeWeights: `${import.meta.env.BASE_URL}images/pesos-livres.webp`,
  mascot: `${import.meta.env.BASE_URL}images/mascote-steel.webp`,
  video: `${import.meta.env.BASE_URL}videos/steel-instagram.mp4`,
};

const place = 'Academia Steel Gym - Catanduva, Av. Eng. José Nelson Machado, 2320, Catanduva - SP';
const message = 'Olá! Conheci a Steel Gym pelo site e gostaria de conhecer melhor a academia.';

export const gym = {
  founded: 2001,
  city: 'Catanduva, SP',
  address: 'Av. Eng. José Nelson Machado, 2320 – Centro, Catanduva – SP, 15800-000',
  phone: '(17) 99168-9110',
  telephone: 'tel:+5517991689110',
  instagram: 'https://www.instagram.com/steelgymacademia/',
  whatsapp: `https://wa.me/5517991689110?text=${encodeURIComponent(message)}`,
  map: `https://maps.google.com/maps?q=${encodeURIComponent(place)}&z=16&output=embed`,
  route: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place)}`,
  google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`,
  hours: 'Fechamento informado às 23h',
  rating: '5,0',
  reviewCount: 64,
};

export const navigation = [
  ['Início', '#inicio'], ['A Steel', '#a-steel'], ['Estrutura', '#estrutura'],
  ['Avaliações', '#avaliacoes'], ['Contato', '#contato'],
];

export const reviews = [
  'Ambiente limpo, agradável e animado, com aparelhos novos e de ótima qualidade.',
  'Lugar estranhamente limpo, organizado, os professores super atenciosos.',
  'Perfeito, tudo ótimo, bem atendido e recebido, 6 meses me sentindo em casa.',
];

export const gallery = [
  { src: media.gymFloor, title: 'Salão de treino', alt: 'Salão da Steel Gym com aparelhos e painéis iluminados em azul' },
  { src: media.freeWeights, title: 'Pesos livres', alt: 'Halteres, bancos e espelhos na área de pesos livres' },
  { src: media.mural, title: 'O mural da Steel', alt: 'Painéis com silhuetas de atletas na parede azul da Steel Gym' },
];
