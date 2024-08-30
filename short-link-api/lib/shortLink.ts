import ShortLink from '../models/ShortLink';

const chars = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
];

const getRandomChar = () => {
  const char = chars[Math.floor(Math.random() * chars.length)];
  const upperCaseChance = Math.floor(Math.random() * 2);

  return upperCaseChance === 1 ? char.toUpperCase() : char;

  // switch (upperCaseChance) {
  //   case 0:
  //     return char;
  //   case 1:
  //     return char.toUpperCase();
  //   default:
  //     return char;
  // }
};

const getShortLink = async (): Promise<string> => {
  const urlArray: string[] = [];

  for (let i = 0; i < 7; i++) {
    urlArray.push(getRandomChar());
  }

  const fullUrl = urlArray.join('');

  const existingLink = await ShortLink.findOne({ shortUrl: fullUrl });

  if (existingLink === null) {
    return fullUrl;
  } else {
    return await getShortLink();
  }
};

export default getShortLink;
