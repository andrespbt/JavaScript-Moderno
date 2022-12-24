const formatearDinero = valor => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(valor);
};

const handleKeyDown = () => {
  console.log('eaea');
};

export { formatearDinero, handleKeyDown };
