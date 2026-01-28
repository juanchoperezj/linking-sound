import { colors } from './theme';

export type LinkingType = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  lightColor: string;
  examples: {
    original: string;
    linked: string;
  }[];
};

export const linkingTypes: LinkingType[] = [
  {
    id: 'consonant-vowel',
    name: 'Consonant to Vowel',
    shortName: 'C→V',
    description: 'When a word ends with a consonant and the next word starts with a vowel, they blend together smoothly.',
    color: colors.accentBlue,
    lightColor: colors.accentBlueLight,
    examples: [
      { original: 'an apple', linked: 'a-napple' },
      { original: 'turn off', linked: 'tur-noff' },
      { original: 'pick it up', linked: 'pi-ki-tup' },
      { original: 'come on', linked: 'co-mon' },
    ],
  },
  {
    id: 'linking-w',
    name: 'Linking /w/',
    shortName: '/w/',
    description: 'When a word ends with /u/, /ʊ/, or /oʊ/ and the next word starts with a vowel, a /w/ sound is inserted.',
    color: colors.accentPrimary,
    lightColor: colors.accentLight,
    examples: [
      { original: 'go out', linked: 'go-wout' },
      { original: 'do it', linked: 'do-wit' },
      { original: 'you are', linked: 'you-ware' },
      { original: 'how about', linked: 'how-wabout' },
    ],
  },
  {
    id: 'linking-j',
    name: 'Linking /j/',
    shortName: '/j/',
    description: 'When a word ends with /i/, /ɪ/, or /eɪ/ and the next word starts with a vowel, a /j/ (y) sound is inserted.',
    color: colors.accentPurple,
    lightColor: colors.accentPurpleLight,
    examples: [
      { original: 'see it', linked: 'see-yit' },
      { original: 'be able', linked: 'be-yable' },
      { original: 'I am', linked: 'I-yam' },
      { original: 'she asked', linked: 'she-yasked' },
    ],
  },
  {
    id: 'assimilation',
    name: 'Consonant Assimilation',
    shortName: 'Assim.',
    description: 'Adjacent consonants blend together, changing their pronunciation for smoother speech.',
    color: colors.accentOrange,
    lightColor: colors.accentOrangeLight,
    examples: [
      { original: "don't you", linked: 'donchu' },
      { original: 'did you', linked: 'didju' },
      { original: 'got you', linked: 'gotcha' },
      { original: 'would you', linked: 'woodju' },
    ],
  },
  {
    id: 'elision',
    name: 'Elision',
    shortName: 'Elision',
    description: 'Certain sounds are dropped or reduced to make speech flow more naturally.',
    color: colors.accentRed,
    lightColor: colors.accentRedLight,
    examples: [
      { original: 'next day', linked: 'nex-day' },
      { original: 'last time', linked: 'las-time' },
      { original: 'hand bag', linked: 'han-bag' },
      { original: 'must be', linked: 'mus-be' },
    ],
  },
  {
    id: 'intrusive-r',
    name: 'Intrusive /r/',
    shortName: '/r/',
    description: 'In British English, an /r/ sound is added between two vowels even when not written.',
    color: colors.accentTeal,
    lightColor: colors.accentTealLight,
    examples: [
      { original: 'idea of', linked: 'idea-r-of' },
      { original: 'law and order', linked: 'law-r-and order' },
      { original: 'media attention', linked: 'media-r-attention' },
      { original: 'Anna is', linked: 'Anna-r-is' },
    ],
  },
];

export const getLinkingTypeById = (id: string): LinkingType | undefined => {
  return linkingTypes.find((type) => type.id === id);
};

export const getLinkingTypeByShortName = (shortName: string): LinkingType | undefined => {
  return linkingTypes.find((type) => type.shortName === shortName);
};
