export const CurrencyValue = ({ currency, value, ...rest }) => {
  return (
    <span {...rest}>
      <strong>{value}</strong> {currency}
    </span>
  );
};
