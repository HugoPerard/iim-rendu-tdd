import { useEffect, useState } from "react";
import { convertToEUR } from "./convertToEUR";

export const Content = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.coinpaprika.com/v1/coins")
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

  const currentCrypto = displayedData?.find(({ id }) => id === currentCryptoId);

  useEffect(() => {
    if (!currentCryptoId) {
      return;
    }
    fetch(`https://api.coinpaprika.com/v1/coins/${currentCryptoId}/markets`)
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
    <div style={{ textAlign: "start" }}>
      <p>Crypto converter</p>
      <div>
        <select onChange={(e) => setCurrentCrypto(e.target.value)}>
          {displayedData?.map((crypto) => (
            <option value={crypto.id}>{crypto.name}</option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="number"
          value={converterInput}
          onChange={(e) => setConverterInput(e.target.value)}
        ></input>
        <span style={{ marginLeft: "20px" }}>
          {currentCrypto?.symbol} is <strong>{convertedValue}</strong> EUR
        </span>
      </div>
    </div>
  );
};
