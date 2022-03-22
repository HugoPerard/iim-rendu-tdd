export const CurrencyValue = ({ currency, value, ...rest }) => {
  return (
    <span {...rest} data-test="display-span">
      <strong>{value}</strong> {currency}
    </span>
  );
};
