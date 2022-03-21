export const convertToEUR = (priceInUSD, quantity = 1) =>
  priceInUSD * 0.91 * quantity;
