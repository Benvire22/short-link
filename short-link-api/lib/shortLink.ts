
const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const getRandomChar = () => {
  const char = chars[Math.floor(Math.random() * chars.length)];
  const upperLowerCharChance = Math.floor(Math.random() * 2);

  switch (upperLowerCharChance) {
    case 0:
      return char;
    case 1:
      return char.toUpperCase();
    default:
      return char;
  }
};

const getShortLink = async () => {
  const urlArray: string[] = [];

  for (let i = 0; i < 7; i++) {
    urlArray.push(getRandomChar());
  }

  return urlArray.join('');
};

export default getShortLink;