import { useEffect, useState } from "react";
import { CurrencyValue } from "./components/CurrencyValue";
import { convertToEUR } from "./convertToEUR";

export const ENDPOINT_COINS = "https://api.coinpaprika.com/v1/coins";
export const ENDPOINT_MARKET = (cryptoId) =>
  `https://api.coinpaprika.com/v1/coins/${cryptoId}/markets`;

export const Content = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch(ENDPOINT_COINS)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(setData)
      .catch((error) => console.error("Error fetching data", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const displayedData = data?.slice(0, 20);

  const [currentCryptoId, setCurrentCrypto] = useState("btc-bitcoin");
  const [currentMarket, setCurrentMarket] = useState();

  console.log({ currentCryptoId });

  const currentCrypto = displayedData?.find(({ id }) => id === currentCryptoId);

  useEffect(() => {
    if (!currentCryptoId) {
      return;
    }
    fetch(ENDPOINT_MARKET(currentCryptoId))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((markets) =>
        setCurrentMarket(
          markets.find(
            (m) =>
              m.base_currency_id === currentCryptoId &&
              m.quote_currency_id === "usd-us-dollars"
          )
        )
      )
      .catch((error) => console.error("Error fetching data", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentCryptoId]);

  const [converterInput, setConverterInput] = useState(1);

  const convertedValue = convertToEUR(
    currentMarket?.quotes["USD"]?.price ?? 0,
    converterInput ?? 1
  ).toFixed(4);

  if (isLoading) {
    return "Chargement...";
  }

  console.log({ displayedData, currentCrypto, currentMarket });

  return (
    <div style={{ textAlign: "start" }} data-test="container">
      <p>Crypto converter</p>
      <div>
        <select
          onChange={(e) => setCurrentCrypto(e.target.value)}
          data-test="cryptos-select"
        >
          {displayedData?.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="number"
          value={converterInput}
          onChange={(e) => setConverterInput(e.target.value)}
          data-test="quantity-input"
        ></input>
        <CurrencyValue
          currency="EUR"
          value={convertedValue}
          style={{ marginLeft: "20px" }}
        />
      </div>
    </div>
  );
};
